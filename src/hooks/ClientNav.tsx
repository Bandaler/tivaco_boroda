// ClientNav.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ClientNavProps {
  children: React.ReactNode;
  containerId?: string;
}

export default function ClientNav({ children, containerId = 'fullpage-container' }: ClientNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // следим за маршрутом

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 0);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // проверка при монтировании / возврате

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerId, pathname]); // зависимость от маршрута

  return <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>{children}</div>;
}
