import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then(r=>r.json())

export default function Home(){
  const { data } = useSWR('/api/popular', fetcher)
  const list = data?.results || []
  return (
    <div className="page">
      <nav className="nav"><h1>VelyStream</h1><div><a href="/search">Search</a></div></nav>
      <main>
        <h2>Popular</h2>
        <div className="grid">
          {list.map(item=>(
            <Link key={item.id} href={`/anime/${item.id}`}><a className="card">
              <img src={item.image} alt={item.title} />
              <div className="meta"><strong>{item.title}</strong></div>
            </a></Link>
          ))}
        </div>
      </main>
    </div>
  )
}
