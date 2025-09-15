// src/hooks/useMenuTree.ts
'use client';

import { menu as staticMenu } from '@/app/data/menu';

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
  children?: MenuItem[];
}

export default function useMenuTree(menuItems: MenuItem[] = staticMenu): MenuItem[] {
  const map: Record<number, MenuItem> = {};
  const roots: MenuItem[] = [];

  menuItems.forEach(item => {
    map[item.id] = { ...item };
  });

  menuItems.forEach(item => {
    const parentId = Number(item.parent);
    if (parentId !== 0 && map[parentId]) {
      if (!map[parentId].children) map[parentId].children = [];
      map[parentId].children!.push(map[item.id]);
    } else if (parentId === 0) {
      roots.push(map[item.id]);
    }
  });

  return roots;
}
