// ClientNav.tsx
'use client';

import { useEffect, useState } from 'react';

interface ClientNavProps {
  children: React.ReactNode;
  containerId?: string; // id кастомного скролл-контейнера
}

export default function ClientNav({ children, containerId = 'fullpage-container' }: ClientNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 0);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // проверка при монтировании

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerId]);

  return <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>{children}</div>;
}
