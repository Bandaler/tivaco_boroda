'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function LanguageSelector() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const langs = [
    { code: 'en', label: 'ENG' },
    { code: 'ms', label: 'MAL' },
  ];

  return (
    <div className={`custom-select ${open ? 'open' : ''}`} style={{ position: 'relative' }}>
      <div className="custom-select__trigger" onClick={() => setOpen(!open)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Image src="/globe2.svg" width={24} height={24} alt="globe" />
        <span>LANG</span>
      </div>

      {open && (
        <div className="custom-options" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: '6px', zIndex: 100 }}>
          {langs.map(l => (
            <Link
              key={l.code}
              href={pathname}
              locale={l.code}
              onClick={() => setOpen(false)}
              className="custom-option"
              style={{ display: 'block', padding: '8px 12px', cursor: 'pointer' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
