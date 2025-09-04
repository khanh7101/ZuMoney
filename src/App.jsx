import React, { useEffect, useState } from 'react'
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import AuthForms from './components/AuthForms.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Summary from './pages/Summary.jsx'
import Categories from './pages/Categories.jsx'

function useSession(){
  const [session, setSession] = useState(null)
  useEffect(()=>{
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => sub?.subscription?.unsubscribe()
  }, [])
  return session
}

export default function App(){
  const session = useSession()
  const loc = useLocation()
  return (
    <>
      <header>
        <div><h1>Chi tiêu cá nhân</h1></div>
        <nav className="tabs">
          <Link className={loc.pathname==='/add'?'active':''} to="/add">Thêm</Link>
          <Link className={loc.pathname==='/list'?'active':''} to="/list">Giao dịch</Link>
          <Link className={loc.pathname==='/summary'?'active':''} to="/summary">Tổng quan</Link>
          <Link className={loc.pathname==='/categories'?'active':''} to="/categories">Danh mục</Link>
        </nav>
        {session && <button className="secondary" onClick={()=>supabase.auth.signOut()}>Đăng xuất</button>}
      </header>

      <main>
        {!session ? (
          <AuthForms />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        )}
      </main>

      <footer><small>PWA offline (vỏ app). Dữ liệu: Supabase (RLS per-user).</small></footer>
    </>
  )
}
