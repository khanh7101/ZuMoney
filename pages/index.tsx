import {useContext,useEffect,useState} from 'react'
import {useRouter} from 'next/router'
import {supabase} from '../src/lib/supabaseClient'
import {AuthContext} from '../src/context/AuthContext'
import Card from '../components/Card'
import Button from '../components/Button'

type Wallet={id:number;user_id:string;amount:number;icon_name:string|null}
type CategoryGroup={id:number;user_id?:string;name:string}
type Category={id:number;category_group_id:number;allocated_amount:number;spent_amount:number;target:string|null;icon_name:string|null}
type Tx={id:number;amount:number;type:'income'|'expense';wallet_id:number;category_id:number|null;note:string|null;created_at:string}

export default function Dashboard(){
 const session=useContext(AuthContext)
 const router=useRouter()
 const [wallets,setWallets]=useState<Wallet[]>([])
 const [groups,setGroups]=useState<CategoryGroup[]>([])
 const [categories,setCategories]=useState<Category[]>([])
 const [tx,setTx]=useState<Tx[]>([])
 const [wIcon,setWIcon]=useState('💳'); const [wValue,setWValue]=useState<number>(0)
 const [gName,setGName]=useState('Monthly Budget')
 const [catGroupId,setCatGroupId]=useState<number|''>(''); const [catTarget,setCatTarget]=useState('Groceries'); const [catIcon,setCatIcon]=useState('🧺'); const [catAlloc,setCatAlloc]=useState<number>(0)
 const [tAmount,setTAmount]=useState<number>(0); const [tType,setTType]=useState<'income'|'expense'>('expense'); const [tWalletId,setTWalletId]=useState<number|''>(''); const [tCategoryId,setTCategoryId]=useState<number|''>(''); const [tNote,setTNote]=useState(''); const [tWhen,setTWhen]=useState<string>(()=>{const n=new Date();const off=n.getTimezoneOffset()*60000;return new Date(n.getTime()-off).toISOString().slice(0,16)})
 useEffect(()=>{ if(session===null) router.replace('/login') },[session,router])
 useEffect(()=>{ if(session?.user){loadWallets();loadGroups();loadCategories();loadTx();}},[session?.user])
 const loadWallets=async()=>{const {data}=await supabase.from('wallets').select('*').order('id',{ascending:true}); setWallets(data??[])}
 const loadGroups=async()=>{const {data}=await supabase.from('category_groups').select('*').order('id',{ascending:true}); setGroups(data??[])}
 const loadCategories=async()=>{const {data}=await supabase.from('categories').select('*').order('id',{ascending:true}); setCategories(data??[])}
 const loadTx=async()=>{const {data}=await supabase.from('transactions').select('*').order('created_at',{ascending:false}).limit(50); setTx(data??[])}
 const signOut=async()=>{await supabase.auth.signOut()}
 if(session===undefined) return <div className='p-6'>Loading…</div>
 if(!session) return null
 return (<div className='max-w-5xl mx-auto p-6 space-y-6'>
  <div className='flex items-center justify-between'>
    <h1 className='text-2xl font-bold'>ZuMoney</h1>
    <div className='text-sm text-[var(--muted)]'>Signed in as {session.user.email??session.user.id} <Button className='ml-3' onClick={signOut}>Sign out</Button></div>
  </div>
  <div className='grid md:grid-cols-3 gap-4'>
    <Card title='Create Wallet'>
      <div className='space-y-3'>
        <input className='w-full p-2 rounded-lg' placeholder='Icon (emoji or name)' value={wIcon} onChange={e=>setWIcon(e.target.value)}/>
        <input type='number' className='w-full p-2 rounded-lg' placeholder='Initial value' value={wValue} onChange={e=>setWValue(Number(e.target.value||0))}/>
        <Button onClick={async()=>{const uid=session.user.id; const {error}=await supabase.from('wallets').insert({user_id:uid,icon_name:wIcon,amount:wValue}); if(!error){setWValue(0); await loadWallets()} else alert(error.message)}}>Add Wallet</Button>
      </div>
      <div className='mt-4 text-sm text-[var(--muted)]'>Your wallets: {wallets.map(w=>w.icon_name??'💼').join(' ')||'—'}</div>
    </Card>
    <Card title='Create Category Group'>
      <div className='space-y-3'>
        <input className='w-full p-2 rounded-lg' placeholder='Group name' value={gName} onChange={e=>setGName(e.target.value)}/>
        <Button onClick={async()=>{const {error}=await supabase.from('category_groups').insert({user_id:session.user.id,name:gName}); if(!error){setGName(''); await loadGroups()} else alert(error.message)}}>Add Group</Button>
      </div>
      <div className='mt-4 text-sm text-[var(--muted)]'>Groups: {groups.map(g=>g.name).join(', ')||'—'}</div>
    </Card>
    <Card title='Create Category'>
      <div className='space-y-3'>
        <select className='w-full p-2 rounded-lg' value={catGroupId} onChange={e=>setCatGroupId(e.target.value?Number(e.target.value):'')}>
          <option value=''>Select group</option>
          {groups.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <input className='w-full p-2 rounded-lg' placeholder='Target (text)' value={catTarget??''} onChange={e=>setCatTarget(e.target.value)}/>
        <input className='w-full p-2 rounded-lg' type='number' placeholder='Allocated amount' value={catAlloc} onChange={e=>setCatAlloc(Number(e.target.value||0))}/>
        <input className='w-full p-2 rounded-lg' placeholder='Icon (emoji or name)' value={catIcon} onChange={e=>setCatIcon(e.target.value)}/>
        <Button onClick={async()=>{if(!catGroupId) return alert('Pick group'); const {error}=await supabase.from('categories').insert({category_group_id:Number(catGroupId),allocated_amount:catAlloc,spent_amount:0,target:catTarget||null,icon_name:catIcon||null}); if(error) alert(error.message); else {setCatAlloc(0); setCatTarget(''); await loadCategories()}}}>Add Category</Button>
      </div>
    </Card>
  </div>
  <Card title='Add Transaction'>
    <div className='grid md:grid-cols-6 gap-3 items-end'>
      <input type='number' className='p-2 rounded-lg md:col-span-1' placeholder='Amount' value={tAmount} onChange={e=>setTAmount(Number(e.target.value||0))}/>
      <select className='p-2 rounded-lg md:col-span-1' value={tType} onChange={e=>setTType(e.target.value as any)}>
        <option value='expense'>Expense</option><option value='income'>Income</option>
      </select>
      <select className='p-2 rounded-lg md:col-span-1' value={tWalletId} onChange={e=>setTWalletId(e.target.value?Number(e.target.value):'')}>
        <option value=''>Wallet</option>
        {wallets.map(w=><option key={w.id} value={w.id}>{w.icon_name??'💼'} #{w.id}</option>)}
      </select>
      <select className='p-2 rounded-lg md:col-span-1' value={tCategoryId} onChange={e=>setTCategoryId(e.target.value?Number(e.target.value):'')} disabled={tType==='income'}>
        <option value=''>{tType==='income'?'Category (optional)':'Category (required)'}</option>
        {categories.map(c=><option key={c.id} value={c.id}>{c.icon_name??'📁'} {c.target??'(untitled)'} </option>)}
      </select>
      <input className='p-2 rounded-lg md:col-span-1' placeholder='Note' value={tNote} onChange={e=>setTNote(e.target.value)}/>
      <input className='p-2 rounded-lg md:col-span-1' type='datetime-local' value={tWhen} onChange={e=>setTWhen(e.target.value)}/>
    </div>
    <div className='mt-3'>
      <Button onClick={async()=>{ if(!tWalletId) return alert('Pick wallet'); if(tType==='expense' && !tCategoryId) return alert('Category required for expense'); const payload:any={amount:tAmount,type:tType,wallet_id:Number(tWalletId),category_id:tType==='expense'?Number(tCategoryId):null,note:tNote||null,created_at:new Date(tWhen).toISOString()}; const {error}=await supabase.from('transactions').insert(payload); if(error) alert(error.message); else {setTAmount(0); setTNote(''); setTCategoryId(''); await loadTx()}}}>Save</Button>
    </div>
  </Card>
  <Card title='Recent Transactions'>
    <div className='space-y-2'>
      {tx.length===0 && <div className='text-[var(--muted)]'>No transactions yet.</div>}
      {tx.map(row=>{const wallet=wallets.find(w=>w.id===row.wallet_id); const cat=categories.find(c=>c.id===(row.category_id??-1)); return (
        <div key={row.id} className='flex items-center justify-between rounded-xl bg-white/5 px-3 py-2'>
          <div className='flex items-center gap-3'>
            <div className='text-xl'>{wallet?.icon_name??'💼'}</div>
            <div>
              <div className='text-sm opacity-80'>{new Date(row.created_at).toLocaleString()}</div>
              <div className='text-xs opacity-60'>{row.type==='expense'?`${cat?.icon_name??''} ${cat?.target??''}`:'Income'}</div>
              <div className='text-xs opacity-60'>{row.note??''}</div>
            </div>
          </div>
          <div className={row.type==='expense'?'text-red-400':'text-emerald-400'}>{row.type==='expense'?'-': '+'}{row.amount.toLocaleString()}</div>
        </div>)})}
    </div>
  </Card>
</div>) }
