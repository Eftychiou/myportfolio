'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    //@ts-expect-error
    window.gtag?.('config', 'G-XXXXXXX', {
      page_path: url
    });
  }, [pathname, searchParams]);

  return null;
}
