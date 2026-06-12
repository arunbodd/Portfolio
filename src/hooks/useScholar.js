import { useState, useEffect } from 'react';

// Bundled fallback so the UI always has sane numbers even if the fetch fails.
const FALLBACK = { citations: 800, hIndex: 11, documents: 18 };

// Reads the cached Google Scholar metrics from /data/scholar.json, which a
// monthly GitHub Action refreshes. Falls back to bundled defaults on any error.
export default function useScholar() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch(`${process.env.PUBLIC_URL}/data/scholar.json`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (alive && j && typeof j.citations === 'number') {
          setData({
            citations: j.citations,
            hIndex: typeof j.hIndex === 'number' ? j.hIndex : FALLBACK.hIndex,
            documents: typeof j.documents === 'number' ? j.documents : FALLBACK.documents,
          });
        }
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return data;
}
