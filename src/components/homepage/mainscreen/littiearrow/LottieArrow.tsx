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
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    if (!isMobile) {
      // таймер для скрытия только на десктопе
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('resize', checkScreen);
  }, [isMobile]);

  if (!visible && !isMobile) return null;

  return (
    <div className="arrow">
      {isMobile ? (
        <img src="/arrow.png" alt="Arrow" />
      ) : (
        <DotLottieReact src="/arrow2.json" loop={false} autoplay />
      )}
    </div>
  );
}

