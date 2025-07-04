'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type MenuItem = {
  id: number;
  title: string;
  url: string;
};

export default function NavMenu({ menu }: { menu: MenuItem[] }) {
  const [isLight, setIsLight] = useState(false);
useEffect(() => {
  let sections: HTMLElement[] = [];

  const updateSections = () => {
    sections = Array.from(document.querySelectorAll<HTMLElement>('section.light'));
  };

 const onScroll = () => {
  if (!sections.length) {
    updateSections();
  }

  const viewportHeight = window.innerHeight;
  const offset = -13; // регулируй по желанию

  const current = sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.bottom > 0;
  });

  if (!current) {
    setIsLight(false);
    return;
  }

  const rect = current.getBoundingClientRect();

  if (rect.bottom <= viewportHeight - offset && rect.bottom > 0) {
    setIsLight(true);
  } else {
    setIsLight(false);
  }
};

  updateSections();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll(); // initial

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}, []);


  return (
    <>
      {/* ЛОГО */}
      <Link href="/" className="logo">
        <Image src={isLight ? "/logo-blue.svg" : "/logo.svg"} width={1000} height={1000} alt="logo" />
      </Link>

      {/* МЕНЮ */}
      <ul className={`nav-menu ${isLight ? 'nav-light' : ''}`}>
        {menu.map((item) => {
          const path = new URL(item.url).pathname;
          return (
            <li key={item.id}>
              <Link href={path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>

      {/* КНОПКИ */}
      <div className="nav-right">
        <button className={`header-btn ${isLight ? 'nav-light' : ''}`}>AI assistant</button>
        <button className={`lang-switcher ${isLight ? 'nav-light' : ''}`}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25 0C9.70172 3.29866e-05 12.5 2.79827 12.5 6.25C12.5 9.70137 9.70223 12.4985 6.25098 12.499V12.5L6.25 12.499V12.5C2.79827 12.5 3.29856e-05 9.70172 0 6.25C0 2.79825 2.79825 0 6.25 0ZM3.52832 6.5C3.56001 8.02607 3.87985 9.39122 4.37109 10.3818C4.83148 11.31 5.41009 11.853 6 11.9736V6.5H3.52832ZM6.5 11.9736C7.09055 11.8537 7.67003 11.311 8.13086 10.3818C8.6221 9.39122 8.94106 8.02607 8.97266 6.5H6.5V11.9736ZM0.506836 6.5C0.615837 9.04665 2.38012 11.1633 4.75195 11.8018C4.4348 11.4834 4.1556 11.0729 3.92285 10.6035C3.39168 9.53234 3.05998 8.08866 3.02832 6.5H0.506836ZM9.47266 6.5C9.441 8.08869 9.10932 9.53234 8.57812 10.6035C8.34546 11.0727 8.06589 11.4825 7.74902 11.8008C10.1203 11.1619 11.8842 9.04622 11.9932 6.5H9.47266ZM4.75195 0.697266C2.37998 1.33563 0.615816 3.45324 0.506836 6H3.02832C3.05998 4.41137 3.3917 2.96766 3.92285 1.89648C4.15572 1.4269 4.4346 1.01571 4.75195 0.697266ZM6.5 6H8.97266C8.94107 4.47392 8.62211 3.1088 8.13086 2.11816C7.66998 1.18882 7.09062 0.645228 6.5 0.525391V6ZM7.74902 0.698242C8.06608 1.01664 8.34534 1.42707 8.57812 1.89648C9.10932 2.96768 9.441 4.41129 9.47266 6H11.9932C11.8842 3.45367 10.1204 1.337 7.74902 0.698242ZM6 0.525391C5.41001 0.64593 4.83153 1.1898 4.37109 2.11816C3.87984 3.1088 3.56 4.47392 3.52832 6H6V0.525391Z" fill="#3CE7B6" />
          </svg>
          <span>ENG</span>
        </button>
      </div>
    </>
  );
}
