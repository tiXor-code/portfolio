// /api/rmm-clip?name=clip-001.mp4
// Proxies Vercel Blob videos through teodorlutoiu.com so IG/FB media
// fetchers (which read robots.txt and reject *.public.blob.vercel-storage.com)
// will accept them.

export default async function handler(req, res) {
  const name = (req.query.name || '').toString();

  // Allowlist: clip-XXX.mp4 only
  if (!/^clip-\d{3}\.mp4$/.test(name)) {
    res.status(400).send('bad name');
    return;
  }

  const upstream = `https://7joaeqizlqqbommi.public.blob.vercel-storage.com/clips/${name}`;

  // Forward Range header so IG/FB can do partial fetches
  const fwd = {};
  if (req.headers.range) fwd['range'] = req.headers.range;

  const r = await fetch(upstream, { headers: fwd });
  if (!r.ok && r.status !== 206) {
    res.status(r.status).send('upstream error');
    return;
  }

  res.status(r.status);
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Accept-Ranges', 'bytes');
  if (r.headers.get('content-length')) res.setHeader('Content-Length', r.headers.get('content-length'));
  if (r.headers.get('content-range')) res.setHeader('Content-Range', r.headers.get('content-range'));

  const buf = Buffer.from(await r.arrayBuffer());
  res.end(buf);
}
