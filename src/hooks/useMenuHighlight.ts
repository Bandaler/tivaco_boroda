'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function useMenuHighlight(mounted: boolean) {
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mounted) return;

    const cleanPath = (pathname ?? '').split('?')[0].split('#')[0].replace(/\/+$/, '');
    const isNewsArticle = /^\/news-articles\/[^/]+$/.test(cleanPath);
    const isEvent = /^\/events\/[^/]+$/.test(cleanPath);
    const isPortfolioPartner = /^\/portfolio\/partners$/.test(cleanPath);
    const isPortfolio = /^\/portfolio(\/[^/]+)?\/?$/.test(cleanPath);


    if (isNewsArticle || isEvent || isPortfolio) {
      setIsLight(true);
      return;
    }
    if (isPortfolioPartner) {
      setIsLight(false);
      return;
    }


    // const checkSections = () => {
    //   const sections = Array.from(document.querySelectorAll<HTMLElement>('section.light'));
    //   if (!sections.length) return setIsLight(false);

    //   const viewportHeight = window.innerHeight;
    //   const offset = -13;

    //   const current = sections.find(section => section.getBoundingClientRect().bottom > 0);
    //   if (!current) {
    //     setIsLight(false);
    //     return;
    //   }

    //   const rect = current.getBoundingClientRect();
    //   setIsLight(rect.bottom <= viewportHeight - offset && rect.bottom > 0);
    // };
    // const checkSections = () => {
    //   const sections = Array.from(document.querySelectorAll<HTMLElement>('section.light'));
    //   if (!sections.length) return setIsLight(false);

    //   const viewportHeight = window.innerHeight;
    //   const offset = -13;

    //   const current = sections.find(section => {
    //     const rect = section.getBoundingClientRect();
    //     return (
    //       rect.top >= 0 + offset &&                // верх секции не выше верхнего края
    //       rect.bottom <= viewportHeight - offset   // низ секции не ниже нижнего края
    //     );
    //   });

    //   setIsLight(!!current);
    // };

    const checkSections = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section.light'));
      if (!sections.length) return setIsLight(false);

      const viewportHeight = window.innerHeight;
      // const offset = -13;
       const offset = 0;

      let maxVisible = 0;
      let current: HTMLElement | null = null;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // считаем, насколько секция пересекается с экраном
        const visibleTop = Math.max(rect.top, 0 + offset);
        const visibleBottom = Math.min(rect.bottom, viewportHeight - offset);
        const visibleHeight = visibleBottom - visibleTop;

        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          current = section;
        }
      });

      setIsLight(!!current);
    };



    // Проверка сразу
    checkSections();

    // Слушаем не window, а контейнер
    const container = document.querySelector<HTMLElement>('#fullpage-container');
    if (!container) return;

    container.addEventListener('scroll', checkSections, { passive: true });
    window.addEventListener('resize', checkSections);

    return () => {
      container.removeEventListener('scroll', checkSections);
      window.removeEventListener('resize', checkSections);
    };
  }, [pathname, mounted]);

  return isLight;
}



///t/test
// const checkSections = () => {
//   const all = Array.from(document.querySelectorAll<HTMLElement>('section'));
//   if (!all.length) return setIsLight(false);

//   // iOS: динамический вьюпорт (адресная строка)
//   const vpH =
//     (window as any).visualViewport?.height ??
//     window.innerHeight;

//   const scrollTop =
//     window.scrollY ??
//     window.pageYOffset ??
//     document.documentElement.scrollTop ??
//     0;

//   const centerY = Math.max(0, scrollTop) + vpH / 2; // центр экрана по документу

//   let active: HTMLElement | null = null;

//   for (const el of all) {
//     const rect = el.getBoundingClientRect();
//     const top = rect.top + scrollTop;
//     const bottom = top + rect.height;
//     if (centerY >= top && centerY < bottom) {
//       active = el;
//       break;
//     }
//   }

//   setIsLight(!!active && active.classList.contains('light'));
// };


// useEffect(() => {
//   let ticking = false;
//   const run = () => {
//     if (ticking) return;
//     ticking = true;
//     requestAnimationFrame(() => {
//       checkSections();
//       ticking = false;
//     });
//   };

//   window.addEventListener('scroll', run, { passive: true });
//   window.addEventListener('resize', run);
//   window.addEventListener('orientationchange', run);
//   (window as any).visualViewport?.addEventListener('resize', run);

//   run(); // первичный вызов

//   return () => {
//     window.removeEventListener('scroll', run);
//     window.removeEventListener('resize', run);
//     window.removeEventListener('orientationchange', run);
//     (window as any).visualViewport?.removeEventListener('resize', run);
//   };
// }, []);
