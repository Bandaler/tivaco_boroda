// data/menu.ts
export const menu = [
  { id: 1, title: 'About', url: 'javascript:void(0)', parent: '0', order: 1 },
  { id: 2, title: 'About us', url: '/#advantages', parent: '1', order: 1 },
  { id: 3, title: 'Team', url: '/about/team', parent: '1', order: 2 },

  { id: 4, title: 'Services', url: 'javascript:void(0)', parent: '0', order: 2 },
  { id: 5, title: 'Our Services', url: '/services', parent: '4', order: 1 },
  // { id: 5, title: 'Courses', url: '/services/courses', parent: '3', order: 2 },

  { id: 6, title: 'Cases', url: '/portfolio', parent: '0', order: 3 },
  { id: 7, title: 'News & Articles', url: '/news-articles', parent: '0', order: 4 },
  // { id: 8, title: 'Events', url: '/events', parent: '0', order: 5 },
  { id: 9, title: 'Contact us', url: '/contacts', parent: '0', order: 6 },
];

// export const menu = [
//   { id: 1, title: 'About', url: 'javascript:void(0)', parent: '0', order: 1 },
//   { id: 2, title: 'About us', url: '/#advantages', parent: '1', order: 1 },
//   { id: 3, title: 'Team', url: '/about/team', parent: '1', order: 2 },

//   { id: 4, title: 'Services', url: 'javascript:void(0)', parent: '0', order: 2 },
//   { id: 5, title: 'Our Services', url: '/services', parent: '3', order: 1 },

//   { id: 6, title: 'Cases', url: '/portfolio', parent: '0', order: 3 },
//   { id: 7, title: 'News & Articles', url: '/news-articles', parent: '0', order: 4 },
//   { id: 8, title: 'Contact us', url: '/contacts', parent: '0', order: 6 },
// ];
