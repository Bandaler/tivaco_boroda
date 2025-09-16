// "use client";

// // import Lottie from "lottie-react";
// // import arrowAnimation from "@/data/arrow.json";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';


// export default function LottieArrow() {
//   return (
//     <div className="arrow">
//       {/* <Lottie animationData={arrowAnimation} loop={false} autoplay  /> */}
//       <DotLottieReact
//       src="/arrow2.json"
//       loop={false}
//       autoplay
//     />
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LottieArrow() {
  const [src, setSrc] = useState('/arrow2.json');

  useEffect(() => {
    const updateSrc = () => {
      if (window.innerWidth <= 992) {
        setSrc('/arrow-mob.json'); // для экранов 992 и меньше
      } else {
        setSrc('/arrow2.json'); // для десктопа
      }
    };

    updateSrc(); // проверка при монтировании
    window.addEventListener('resize', updateSrc);

    return () => window.removeEventListener('resize', updateSrc);
  }, []);

  return (
    <div className="arrow">
      <DotLottieReact src={src} loop={false} autoplay />
    </div>
  );
}
