import React from 'react'
export default function Card({title,children}:{title:string,children:React.ReactNode}){return(<div className='card shadow-lg'><h2 className='text-lg font-semibold mb-3'>{title}</h2>{children}</div>)}
