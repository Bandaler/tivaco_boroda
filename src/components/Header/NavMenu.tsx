'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { menu as staticMenu } from '@/app/data/menu';
import useMenuHighlight from '@/hooks/useMenuHighlight';
import useMenuTree from '@/hooks/useMenuTree';



export default function NavMenu() {
  // const [isLight, setIsLight] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  const isLight = useMenuHighlight(mounted);
  const menuTree = useMenuTree(staticMenu);


  // --- Клик вне меню закрывает сабменю ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenSubmenuId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!mounted) return null;

  const normalize = (url: string) => url.replace(/\/+$/, '');

  return (
    <>
      <Link href="/" className="logo">
        <Image src={isLight ? "/logo-blue.svg" : "/logo.svg"} width={1000} height={1000} alt="logo" />
      </Link>

      <ul ref={menuRef} className={`nav-menu ${isLight ? 'nav-light' : ''} ${isOpen ? 'active' : ''}`}>
        <Link href="/"
          className="logo-mobile"
          onClick={() => {
            setIsOpen(false);
            setOpenSubmenuId(null);
          }}
        >
          <Image src={"/logo.svg"} width={1000} height={1000} alt="logo" />
        </Link>
        <button className={`lang-switcher-mobile`}>
          <Image src={'/globe2.svg'} width={34} height={34} alt='img' />
        </button>
        {menuTree.map(item => (
          <li key={item.id}>
            {item.children && item.children.length > 0 ? (
              <>
                <button
                  className={`menu-parent ${openSubmenuId === item.id ? 'active-item' : ''} ${normalize(pathname ?? '') === normalize(item.url) ? 'active-item' : ''}`}
                  onClick={() => setOpenSubmenuId(openSubmenuId === item.id ? null : item.id)}
                >
                  {item.title}
                </button>
                <ul className={`sub-menu ${openSubmenuId === item.id ? 'active' : ''}`}>
                  {item.children.map(child => (
                    <li key={child.id}>
                      <Link
                        href={child.url}
                        className={normalize(pathname ?? '') === normalize(child.url) ? 'active-item' : ''}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenSubmenuId(null);
                        }}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                href={item.url}
                className={normalize(pathname ?? '') === normalize(item.url) ? 'active-item' : ''}
                onClick={() => {
                  setIsOpen(false);
                  setOpenSubmenuId(null);
                }}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}

        <button className="close-menu" onClick={() => setIsOpen(false)}>
          <Image src={'/close.svg'} width={34} height={34} alt='img' />
        </button>
      </ul>

      <div className="nav-right">
        <button className={`header-btn ${isLight ? 'nav-light' : ''}`}>AI assistant</button>
        <button className={`lang-switcher ${isLight ? 'nav-light' : ''}`}>
          <Image src={'/globe2.svg'} width={34} height={34} alt='img' /><span>ENG</span>
        </button>
        <button className="burger" onClick={() => setIsOpen(true)}>
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="2" fill="white" />
            <rect y="12" width="34" height="2" fill="white" />
            <rect y="24" width="34" height="2" fill="white" />
          </svg>
        </button>
      </div>
    </>
  );
}