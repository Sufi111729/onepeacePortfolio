import { useEffect } from 'react';

export default function RouteMeta({ robots = 'index, follow' }) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute('content');

    if (meta) {
      meta.setAttribute('content', robots);
    }

    return () => {
      if (meta && previous) {
        meta.setAttribute('content', previous);
      }
    };
  }, [robots]);

  return null;
}
