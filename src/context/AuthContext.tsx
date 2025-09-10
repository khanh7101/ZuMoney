import React,{createContext,useEffect,useState} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
export const AuthContext=createContext<Session|null|undefined>(undefined)
export function AuthProvider({children}:{children:React.ReactNode}){
 const [session,setSession]=useState<Session|null|undefined>(undefined)
 useEffect(()=>{supabase.auth.getSession().then(({data:{session}})=>setSession(session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>subscription.unsubscribe()},[])
 return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}
