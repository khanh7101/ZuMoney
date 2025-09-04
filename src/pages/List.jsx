import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })
const todayStr = () => new Date().toISOString().slice(0,10)
const monthStartStr = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10)

export default function List(){
  const [cats, setCats] = useState([])
  const [list, setList] = useState([])
  const [from, setFrom] = useState(monthStartStr())
  const [to, setTo] = useState(todayStr())
  const [cat, setCat] = useState('')
  const [type, setType] = useState('')

  useEffect(()=>{ loadCats(); refresh() }, [])

  async function loadCats(){
    const { data } = await supabase.from('categories').select('*').order('type').order('name')
    setCats(data || [])
  }
  async function refresh(){
    let q = supabase.from('transactions').select('*, categories(name,type)').order('occurred_on', { ascending:false }).order('created_at', { ascending:false })
    if(from) q = q.gte('occurred_on', from)
    if(to) q = q.lte('occurred_on', to)
    if(cat) q = q.eq('category_id', cat)
    if(type) q = q.eq('type', type)
    const { data, error } = await q
    if(error) alert(error.message); else setList(data || [])
  }

  const totals = list.reduce((acc, t)=>{
    if(t.type==='expense') acc.expense += Number(t.amount||0)
    if(t.type==='income') acc.income += Number(t.amount||0)
    return acc
  }, { expense:0, income:0 })

  return (
    <>
      <section className="card">
        <h2>Bộ lọc</h2>
        <div className="row">
          <div className="col">
            <label>Từ ngày</label>
            <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
          </div>
          <div className="col">
            <label>Đến ngày</label>
            <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Danh mục</label>
            <select value={cat} onChange={e=>setCat(e.target.value)}>
              <option value="">(Tất cả)</option>
              {cats.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label>Loại</label>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="">(Tất cả)</option>
              <option value="expense">Chi ra</option>
              <option value="income">Thu vào</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button className="secondary" onClick={refresh}>Áp dụng</button>
          <button className="secondary" onClick={()=>{ setFrom(monthStartStr()); setTo(todayStr()); setCat(''); setType(''); }}>Reset</button>
        </div>
      </section>

      <section className="card">
        <h2>Tổng</h2>
        <div className="totals">
          <div><strong>Chi ra:</strong> {money.format(totals.expense)}</div>
          <div><strong>Thu vào:</strong> {money.format(totals.income)}</div>
          <div><strong>Cân bằng:</strong> {money.format(totals.income - totals.expense)}</div>
        </div>
      </section>

      <ul className="list">
        {list.length===0 && <li className="item"><div>Không có giao dịch.</div></li>}
        {list.map(t=> (
          <li className="item" key={t.id}>
            <div className="meta">
              <div className="topline">
                <strong>{t.categories?.name || '(Không danh mục)'}</strong>
                <span className="badge">{t.type==='expense' ? 'Chi' : 'Thu'}</span>
                <span className="badge">{t.occurred_on}</span>
              </div>
              <div>{t.note || ''}</div>
            </div>
            <div className={`amount ${t.type}`}>{money.format(Number(t.amount||0))}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
