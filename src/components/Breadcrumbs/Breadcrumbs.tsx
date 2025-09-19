'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
  label: string;
  href?: string;
}

// Карта "основных" сегментов пути → название для хлебных крошек
const MAIN_CRUMBS: Record<string, string> = {
  services: 'Our Services',
  'about/team': 'Team',
  'services/courses': 'Courses',
  portfolio: 'Portfolio',
  'news-articles': 'News & Articles',
  events: 'Events',
  contacts: 'Contacts', // 
  policy: 'Privacy-policy', // 
};

export default function Breadcrumbs({ current }: { current?: string }) {
  const pathname = usePathname();
  const crumbs: Crumb[] = [{ label: 'Main', href: '/' }];

  // Разбиваем путь на сегменты
  const parts = pathname.split('/').filter(Boolean);

  // Проверяем каждый сегмент и формируем крошки
  let accumulatedPath = '';
  parts.forEach((part, index) => {
    accumulatedPath += `/${part}`;
    const key = index > 0 ? `${parts[index - 1]}/${part}` : part; // для about/team, about/courses
    if (MAIN_CRUMBS[key]) {
      crumbs.push({ label: MAIN_CRUMBS[key], href: accumulatedPath });
    }
  });

  // Добавляем текущую страницу, если есть и она не совпадает с последней крошкой
  const lastCrumb = crumbs[crumbs.length - 1];
  if (current && lastCrumb?.label !== current) {
    crumbs.push({ label: current });
  }

  return (
    <nav className="breadcrumbs">
      {crumbs.map((crumb, i) => (
        <span className="breadcrumbs-item" key={i}>
          {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
          {i < crumbs.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}
