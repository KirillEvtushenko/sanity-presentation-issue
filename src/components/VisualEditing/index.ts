import { HistoryAdapterNavigate, enableOverlays } from '@sanity/overlays';
import { useLiveMode } from '@sanity/react-loader';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { sanityPreviewClient } from '@/services/sanity';

export function VisualEditing() {
  const router = useRouter();
  const routerRef = useRef(router);
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>();

  routerRef.current = router;

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    const disable = enableOverlays({
      history: {
        subscribe: navigate => {
          setNavigate(() => navigate);
          return () => setNavigate(undefined);
        },
        update: update => {
          switch (update.type) {
            case 'push':
              return routerRef.current.push(update.url);
            case 'pop':
              return routerRef.current.back();
            case 'replace':
              return routerRef.current.replace(update.url);
            default:
              throw new Error(`Unknown update type: ${update.type}`);
          }
        },
      },
    });
    return () => disable();
  }, []);

  useEffect(() => {
    if (navigate) {
      navigate({
        type: 'push',
        url: router.asPath,
      });
    }
  }, [navigate, router.asPath]);

  useEffect(() => {
    // If not an iframe, turn off Draft Mode
    if (window === parent) {
      location.href = '/api/exit-preview';
    }
  }, []);

  useLiveMode({ client: sanityPreviewClient });

  return null;
}
