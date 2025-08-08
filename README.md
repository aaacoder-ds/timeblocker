## Timeblocker – Google Calendar Timeboxing Tool

Plan your day with timeboxing and export an .ics file compatible with Google Calendar.

### Features
- Timeboxing UI with task durations (30m, 1h, 1h30m, or minutes)
- .ics export for Google Calendar
- SEO: sitemap.xml (with schema), robots.txt (crawl delay), custom 404
- Analytics via data.timeblocker.aaacoder.xyz
- Footer keywords and cross-promo link to https://aaacoder.xyz/

### Tech
- Next.js 14 (App Router), React 18, TypeScript 5
- Docker (standalone image), GitHub Actions (multi-arch + manifest)

### Local development
```
npm install
npm run dev
# http://localhost:3000
```

### Production build
```
npm run build
npm start
```

### Docker (local)
```
docker build -t timeblocker:local .
docker run --rm -p 3000:3000 timeblocker:local
```

### E2E sanity via Docker
```
docker build -t timeblocker:e2e .
cid=$(docker run -d -p 3000:3000 timeblocker:e2e)
for i in {1..30}; do if curl -fsS http://localhost:3000/ >/dev/null; then echo Ready; break; fi; sleep 1; done
curl -fsS http://localhost:3000/ | head -n 20
curl -fsS http://localhost:3000/robots.txt
curl -fsS http://localhost:3000/sitemap.xml | head -n 40
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/does-not-exist
docker rm -f "$cid"
```

### CI/CD
Images are built via GitHub Actions matrix (amd64/arm64) and published to GHCR (`ghcr.io/aaacoder-ds/timeblocker`) with multi-arch manifests.

### Dokploy
Use `dokploy-compose.yml` targeting `timeblocker.aaacoder.xyz`. Image source: `ghcr.io/aaacoder-ds/timeblocker:latest`. Ensure Traefik external network exists and DNS points to ingress.

### License
See LICENSE.

