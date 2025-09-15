// data/menu.ts
export interface MenuItem {
  id: number;
  title: string;
  url: string;
  parent: string;
  order: number;
  children?: MenuItem[];
}

export const menu: MenuItem[] = [
  { id: 1, title: 'Home', url: '/', parent: '0', order: 1 },
  { id: 2, title: 'About', url: '/about', parent: '0', order: 2 },
  { id: 3, title: 'Team', url: '/about#team', parent: '2', order: 1 },
  { id: 4, title: 'Blog', url: '/blog', parent: '0', order: 3 },
  { id: 5, title: 'Contact', url: '/contact', parent: '0', order: 4 },
];
