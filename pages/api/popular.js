export default async function handler(req, res) {
  try {
    const base = process.env.NEXT_PUBLIC_STREAM_API || 'https://api.consumet.org'
    const r = await fetch(`${base}/meta/anilist/top-airing?page=1&perPage=48`)
    const json = await r.json()
    const results = (json?.data || []).map(it=>({ id: it.id || it.anilist_id || it.mal_id, title: it.title?.english || it.title?.romaji || it.title, image: it.image || it.cover }))
    res.json({ results })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
