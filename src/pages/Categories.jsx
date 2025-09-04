import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Categories(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [type, setType] = useState('expense')

  useEffect(()=>{ refresh() }, [])

  async function refresh(){
    const { data, error } = await supabase.from('categories').select('*').order('type').order('name')
    if(error) alert(error.message)
    else setList(data || [])
  }
  async function add(e){
    e.preventDefault()
    if(!name.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('categories').insert({ name: name.trim(), type, user_id: user.id })
    if(error) alert(error.message)
    else { setName(''); setType('expense'); await refresh() }
  }
  async function del(id){
    if(!confirm('Xóa danh mục này?')) return
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if(error) alert(error.message); else await refresh()
  }

  return (
    <section className="card">
      <h2>Danh mục</h2>
      <form className="row" onSubmit={add}>
        <div className="col">
          <label>Tên danh mục</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="vd: Ăn uống" />
        </div>
        <div className="col">
          <label>Loại</label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="expense">Chi ra</option>
            <option value="income">Thu vào</option>
          </select>
        </div>
        <button type="submit">Thêm</button>
      </form>
      <ul className="list">
        {list.map(c => (
          <li key={c.id} className="item">
            <div className="meta"><div className="topline"><strong>{c.name}</strong> <span className="badge">{c.type==='expense'?'Chi':'Thu'}</span></div></div>
            <div><button className="secondary" onClick={()=>del(c.id)}>Xóa</button></div>
          </li>
        ))}
      </ul>
    </section>
  )
}
