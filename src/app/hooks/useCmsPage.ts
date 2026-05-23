import { useEffect, useState } from 'react';

type CmsPageContent = {
  title: string;
  headline: string;
  body: string;
  isEnabled: boolean;
};

export function useCmsPage(slug: string, fallback: CmsPageContent) {
  const [content, setContent] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/pages/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error('Page content unavailable');
        return response.json();
      })
      .then((page) => {
        if (!cancelled) {
          setContent({
            title: page.title || fallback.title,
            headline: page.headline || fallback.headline,
            body: page.body || fallback.body,
            isEnabled: page.isEnabled ?? fallback.isEnabled,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setContent(fallback);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, fallback.title, fallback.headline, fallback.body, fallback.isEnabled]);

  return content;
}
