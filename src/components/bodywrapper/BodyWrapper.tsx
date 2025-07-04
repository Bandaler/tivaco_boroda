'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fontClass?: string;
};

export default function BodyWrapper({ children, fontClass = '' }: Props) {
  const pathname = usePathname();
  const [pageClass, setPageClass] = useState('');

  // Классы страницы по роуту
  useEffect(() => {
    if (pathname === '/about') {
      setPageClass('is-about-page');
    } else if (pathname === '/news') {
      setPageClass('is-news-page');
    } else if (pathname === '/') {
      setPageClass('is-home-page');
    } else {
      setPageClass('');
    }
  }, [pathname]);

  return (
    <body className={`${fontClass} ${pageClass}`}>
      {children}
    </body>
  );
}
