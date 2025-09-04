import React from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForms(){
  async function onSignin(e){
    e.preventDefault()
    const email = e.currentTarget.email.value.trim()
    const password = e.currentTarget.password.value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) alert(error.message)
  }
  async function onSignup(e){
    e.preventDefault()
    const email = e.currentTarget.email.value.trim()
    const password = e.currentTarget.password.value
    const { error } = await supabase.auth.signUp({ email, password })
    if(error) alert(error.message)
    else alert('Đăng ký thành công. Hãy đăng nhập.')
  }
  return (
    <section className="auth">
      <div className="card">
        <h2>Đăng nhập</h2>
        <form onSubmit={onSignin}>
          <label>Email</label>
          <input type="email" name="email" required placeholder="you@example.com" />
          <label>Mật khẩu</label>
          <input type="password" name="password" required placeholder="••••••••" />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
      <div className="card">
        <h2>Tạo tài khoản</h2>
        <form onSubmit={onSignup}>
          <label>Email</label>
          <input type="email" name="email" required />
          <label>Mật khẩu</label>
          <input type="password" name="password" required />
          <button type="submit" className="secondary">Đăng ký</button>
        </form>
      </div>
    </section>
  )
}
