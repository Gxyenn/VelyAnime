# VelyStream — Public-ready (Next.js) — Deploy to Vercel

This VelyStream starter uses public Consumet gogoanime endpoints (no API key needed) for metadata and stream links.
**Important:** This starter does not host videos. It fetches stream sources from public scraper APIs. Use responsibly.

## Features
- Home (popular/ongoing) via Consumet gogoanime endpoints
- Search via Consumet
- Anime detail pages with episode lists
- Player page that fetches playable sources from Consumet `watch` endpoint and embeds them
- No login, no database — Vercel-ready

## Environment
No API key required. However you can set `NEXT_PUBLIC_STREAM_API` to your own consumet instance if you self-host.

## Quick deploy (Vercel)
1. Push to GitHub or upload ZIP to Vercel import.  
2. Deploy — Vercel will run `npm install` automatically.  
3. (Optional) set `NEXT_PUBLIC_STREAM_API` to your own consumet instance URL if you self-host. Otherwise the app uses `https://api.consumet.org` by default.

## Local dev
1. `npm install`
2. `npm run dev`

## Endpoints used (examples)
- Search: `https://api.consumet.org/anime/gogoanime/<query>`
- Details: `https://api.consumet.org/anime/gogoanime/info/<id>`
- Watch: `https://api.consumet.org/anime/gogoanime/watch/<id>`

## Notes on legality
Public scraper APIs may return copyrighted stream links. Use responsibly and comply with copyright laws. Self-host for stability if needed.
