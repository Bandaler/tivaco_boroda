// // src/hooks/useFullPageScroll.ts
// "use client";

// import { useEffect, useRef } from "react";

// export default function useFullPageScroll(totalSections: number) {
//   const scrollRef = useRef(0);

//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       if (e.deltaY > 0 && scrollRef.current < totalSections - 1) {
//         scrollRef.current += 1;
//       } else if (e.deltaY < 0 && scrollRef.current > 0) {
//         scrollRef.current -= 1;
//       }

//       const scrollTo = document.querySelectorAll(".section")[scrollRef.current];
//       scrollTo?.scrollIntoView({ behavior: "smooth" });
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//     };
//   }, [totalSections]);
// }

"use client";

import { useEffect, useRef } from "react";

export default function useFullPageScroll(totalSections: number) {
  const scrollRef = useRef(0);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll<HTMLElement>(".section");
    const target = sections[index];
    if (target) {
      isScrolling.current = true;
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // debounce (иначе можно быстро перескочить)
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0 && scrollRef.current < totalSections - 1) {
        scrollRef.current += 1;
      } else if (e.deltaY < 0 && scrollRef.current > 0) {
        scrollRef.current -= 1;
      }

      scrollToSection(scrollRef.current);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (isScrolling.current) return;

      if (deltaY > 50 && scrollRef.current < totalSections - 1) {
        // свайп вверх → следующая секция
        scrollRef.current += 1;
      } else if (deltaY < -50 && scrollRef.current > 0) {
        // свайп вниз → предыдущая секция
        scrollRef.current -= 1;
      }

      scrollToSection(scrollRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [totalSections]);
}
