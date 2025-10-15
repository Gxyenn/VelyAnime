export default async function handler(req, res) {
  try {
    const q = req.query.q || ''
    if(!q) return res.json({ results: [] })
    const base = process.env.NEXT_PUBLIC_STREAM_API || 'https://api.consumet.org'
    const r = await fetch(`${base}/meta/anilist/search?query=${encodeURIComponent(q)}&page=1`)
    const json = await r.json()
    const results = (json?.results || []).map(it=>({ id: it.id, title: it.title?.romaji || it.title?.english || it.title, image: it.image }))
    res.json({ results })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
