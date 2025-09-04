import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const todayStr = () => new Date().toISOString().slice(0,10)
function sevenDaysAgoStr(){ const d = new Date(); d.setDate(d.getDate()-6); return d.toISOString().slice(0,10) }
function monthStartStr(){ const d=new Date(); return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0,10) }

export default function Summary(){
  const [weekData, setWeekData] = useState({ labels: [], values: [] })
  const [catData, setCatData] = useState({ labels: [], values: [] })

  useEffect(()=>{ load() }, [])

  async function load(){
    const from7 = sevenDaysAgoStr(), to = todayStr()
    let { data: t7 } = await supabase.from('transactions').select('occurred_on, amount, type').gte('occurred_on', from7).lte('occurred_on', to)
    t7 = t7 || []
    const labels = [], values = []
    for(let i=0;i<7;i++){
      const d = new Date(); d.setDate(d.getDate()-6+i); const k = d.toISOString().slice(0,10)
      labels.push(k)
      values.push((t7.filter(x=>x.occurred_on===k && x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0)) || 0)
    }
    setWeekData({ labels, values })

    const fromM = monthStartStr()
    const { data: byCat } = await supabase.from('transactions').select('amount, type, categories(name)').gte('occurred_on', fromM).lte('occurred_on', to)
    const map = new Map()
    ;(byCat||[]).filter(r=>r.type==='expense').forEach(r=>{
      const name = r.categories?.name || 'Khác'
      map.set(name, (map.get(name)||0) + Number(r.amount||0))
    })
    setCatData({ labels: Array.from(map.keys()), values: Array.from(map.values()) })
  }

  return (
    <>
      <section className="card">
        <h2>7 ngày qua</h2>
        <Bar height={140} data={{ labels: weekData.labels, datasets: [{ label:'Chi ra (7 ngày)', data: weekData.values }] }} options={{ responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true }}}} />
      </section>
      <section className="card">
        <h2>Tháng này theo danh mục</h2>
        <Doughnut height={180} data={{ labels: catData.labels, datasets: [{ label:'Chi theo danh mục (tháng này)', data: catData.values }] }} options={{ responsive:true, maintainAspectRatio:false }} />
      </section>
    </>
  )
}
