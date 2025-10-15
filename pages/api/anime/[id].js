export default async function handler(req, res) {
  try {
    const { id } = req.query
    const base = process.env.NEXT_PUBLIC_STREAM_API || 'https://api.consumet.org'
    let r = await fetch(`${base}/meta/anilist/info/${id}`)
    let json = await r.json()
    if(!json || json.error) {
      r = await fetch(`${base}/meta/gogoanime/info/${id}`)
      json = await r.json()
    }
    const anime = {
      id: json.id || id,
      providerId: json?.id || json?.anilist_id || json?.mal_id,
      title: json?.title?.english || json?.title?.romaji || json?.title,
      image: json?.image || json?.cover || (json?.image_url || ''),
      description: json?.description || json?.synopsis,
      episodes: (json?.episodes || []).map((e,idx)=>({ id: e.id || idx+1, number: e.number || idx+1 }))
    }
    res.json({ anime })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
