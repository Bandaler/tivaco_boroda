// 'use client';

// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// export default function AOSInit() {
//   useEffect(() => {
//     AOS.init({
//       duration: 800, // длительность анимации
//       once: true,    // анимация только один раз
//     });
//   }, []);

//   return null; // этот компонент только инициализирует AOS
// }
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return null;
}
