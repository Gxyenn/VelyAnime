import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
const fetcher = (url) => fetch(url).then(r=>r.json())

export default function Search(){
  const [q,setQ] = useState('')
  const { data } = useSWR(() => q.length>2 ? `/api/search?q=${encodeURIComponent(q)}` : null, fetcher)
  const results = data?.results || []
  return (
    <div className="page">
      <nav className="nav"><a href='/'>← Home</a><h1>Search</h1></nav>
      <main>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search anime..." />
        <div className="grid">
          {results.map(r=> (
            <Link key={r.id} href={`/anime/${r.id}`}><a className="card">
              <img src={r.image} alt={r.title} />
              <div className="meta"><strong>{r.title}</strong></div>
            </a></Link>
          ))}
        </div>
      </main>
    </div>
  )
}
