import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Player(){
  const router = useRouter()
  const { provider, animeId, ep, embed } = router.query
  const [src, setSrc] = useState(null)
  const [sources, setSources] = useState([])

  useEffect(()=>{
    if(embed) { setSrc(embed); return }
    if(!animeId) return
    const base = process.env.NEXT_PUBLIC_STREAM_API || 'https://api.consumet.org'
    const url = `${base}/meta/gogoanime/watch/${animeId}`
    fetch(url).then(r=>r.json()).then(j=>{
      const epNum = parseInt(ep||'1')
      const found = (j?.episodes || []).find(x=>parseInt(x.number)===epNum) || (j?.episodes && j.episodes[0])
      const items = found?.sources || found?.player || []
      if(Array.isArray(items) && items.length>0){
        setSources(items)
        const pick = items.find(s=>s.url && s.url.includes('mp4')) || items[0]
        setSrc(pick.url || items[0].url)
      } else if(j?.sources){
        setSources(j.sources)
        setSrc(j.sources[0]?.url)
      } else {
        setSrc(url)
      }
    }).catch(err=>{
      console.error(err)
      setSrc(null)
    })
  }, [animeId, ep, embed])

  return (
    <div className="page player">
      <nav className="nav"><a href='/'>← Home</a><h1>Player</h1></nav>
      <main>
        {src ? (
          <div className="playerWrap">
            <iframe title="player" src={src} frameBorder="0" allowFullScreen style={{width:'100%',height:'80vh'}} />
            <div style={{marginTop:8}}>
              <strong>Sources</strong>
              <ul>
                {sources.map((s,i)=>(<li key={i}><a href={s.url} target="_blank" rel="noreferrer">Source {i+1}</a></li>))}
              </ul>
            </div>
          </div>
        ) : (
          <div><p>No playable source found. Try add `&embed=` with an embed url or check animeId.</p></div>
        )}
      </main>
    </div>
  )
}
