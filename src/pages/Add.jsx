import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Add(){
  const [cats, setCats] = useState([])
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')

  useEffect(()=>{ loadCategories() }, [])

  async function loadCategories(){
    await ensureDefaults()
    const { data, error } = await supabase.from('categories').select('*').order('type').order('name')
    if(error) alert(error.message); else setCats(data || [])
  }
  async function ensureDefaults(){
    const { count } = await supabase.from('categories').select('id', { count:'exact', head:true })
    if(count && count > 0) return
    const { data: { user } } = await supabase.auth.getUser()
    const defaults = ['Ăn uống','Di chuyển','Hóa đơn','Mua sắm','Sức khỏe','Giáo dục','Giải trí','Khác'].map(n=>({ name:n, type:'expense', user_id:user.id }))
    defaults.push({ name:'Lương', type:'income', user_id:user.id }, { name:'Khác', type:'income', user_id:user.id })
    await supabase.from('categories').insert(defaults)
  }

  async function onSubmit(e){
    e.preventDefault()
    const amt = Number(amount)
    if(!amt || amt <= 0) { alert('Số tiền không hợp lệ'); return }
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('transactions').insert({ user_id:user.id, amount:amt, type, category_id:category || null, occurred_on:date, note })
    if(error) alert(error.message)
    else {
      setAmount(''); setNote(''); setType('expense'); setCategory(''); setDate(new Date().toISOString().slice(0,10))
      alert('Đã lưu giao dịch')
    }
  }

  return (
    <section className="card">
      <h2>Thêm giao dịch</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <label>Số tiền (VND)</label>
            <input type="number" step="1000" min="0" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="vd: 50000" />
          </div>
          <div className="col">
            <label>Loại</label>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="expense">Chi ra</option>
              <option value="income">Thu vào</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Danh mục</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="">(Không danh mục)</option>
              {cats.map(c=> <option key={c.id} value={c.id}>{c.name} ({c.type==='expense'?'chi':'thu'})</option>)}
            </select>
          </div>
          <div className="col">
            <label>Ngày</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
        </div>
        <label>Ghi chú</label>
        <input type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder="vd: Trưa ăn bún bò" />
        <button type="submit">Lưu giao dịch</button>
      </form>
    </section>
  )
}
