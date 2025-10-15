import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
const fetcher = (url) => fetch(url).then(r=>r.json())

export default function AnimePage(){
  const router = useRouter()
  const { id } = router.query
  const { data } = useSWR(() => id ? `/api/anime/${id}` : null, fetcher)
  if(!data) return <div className="page"><p>Loading...</p></div>
  const anime = data.anime
  return (
    <div className="page">
      <nav className="nav"><a href="/">← Home</a><h1>{anime?.title}</h1></nav>
      <main className="detail">
        <img className="cover" src={anime?.image} alt={anime?.title} />
        <div className="info">
          <h2>{anime?.title}</h2>
          <p>{anime?.description?.slice(0,500) || 'No description'}</p>
          <h3>Episodes</h3>
          <div className="eps">
            {(anime?.episodes || []).map(ep=> (
              <a key={ep.id} href={`/player?provider=gogo&animeId=${anime.providerId || anime.id}&ep=${ep.number}`} className="ep">EP {ep.number}</a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
