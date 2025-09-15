"use client";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";


interface Props {
  children: ReactNode;
}

export default function FullPageScrollWrapper({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const totalSections = React.Children.count(children);

  const scrollToSection = useCallback((index: number) => {
    if (!containerRef.current) return;
    isScrolling.current = true;
    const top = containerRef.current.clientHeight * index;
    containerRef.current.scrollTo({ top, behavior: "smooth" });
    setCurrentSection(index);
    setTimeout(() => (isScrolling.current = false), 700);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (!containerRef.current || isScrolling.current) return;
      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    },
    [currentSection, totalSections, scrollToSection]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStartY.current || isScrolling.current) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) < 30) return;

      if (deltaY > 0 && currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
        touchStartY.current = null;
      } else if (deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
        touchStartY.current = null;
      }
    },
    [currentSection, totalSections, scrollToSection]
  );

  // ✅ Добавляем класс body только при монтировании этого компонента
  useEffect(() => {
    document.body.classList.add("lock");

    return () => {
      document.body.classList.remove("lock"); // убрать, если компонент размонтируется
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  return (
    <div
      id="fullpage-container"
      ref={containerRef}
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

// "use client";
// import React, {
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import AnimatedBlock from "@/components/AnimatedBlock/AnimatedBlock";

// interface Props {
//   children: ReactNode;
// }

// export default function FullPageScrollWrapper({ children }: Props) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [currentSection, setCurrentSection] = useState(0);
//   const isScrolling = useRef(false);
//   const touchStartY = useRef<number | null>(null);
//   const totalSections = React.Children.count(children);

//   const scrollToSection = useCallback((index: number) => {
//     if (!containerRef.current) return;
//     isScrolling.current = true;
//     const top = containerRef.current.clientHeight * index;
//     containerRef.current.scrollTo({ top, behavior: "smooth" });
//     setCurrentSection(index);
//     setTimeout(() => (isScrolling.current = false), 700);
//   }, []);

//   const handleWheel = useCallback(
//     (e: WheelEvent) => {
//       e.preventDefault();
//       if (!containerRef.current || isScrolling.current) return;
//       if (e.deltaY > 0 && currentSection < totalSections - 1) {
//         scrollToSection(currentSection + 1);
//       } else if (e.deltaY < 0 && currentSection > 0) {
//         scrollToSection(currentSection - 1);
//       }
//     },
//     [currentSection, totalSections, scrollToSection]
//   );

//   const handleTouchStart = useCallback((e: TouchEvent) => {
//     touchStartY.current = e.touches[0].clientY;
//   }, []);

//   const handleTouchMove = useCallback(
//     (e: TouchEvent) => {
//       if (!touchStartY.current || isScrolling.current) return;
//       const touchEndY = e.touches[0].clientY;
//       const deltaY = touchStartY.current - touchEndY;

//       if (Math.abs(deltaY) < 30) return;

//       if (deltaY > 0 && currentSection < totalSections - 1) {
//         scrollToSection(currentSection + 1);
//         touchStartY.current = null;
//       } else if (deltaY < 0 && currentSection > 0) {
//         scrollToSection(currentSection - 1);
//         touchStartY.current = null;
//       }
//     },
//     [currentSection, totalSections, scrollToSection]
//   );

//   // ✅ Добавляем класс body только при монтировании этого компонента
//   useEffect(() => {
//     document.body.classList.add("lock");

//     return () => {
//       document.body.classList.remove("lock"); // убрать, если компонент размонтируется
//     };
//   }, []);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     el.addEventListener("wheel", handleWheel, { passive: false });
//     el.addEventListener("touchstart", handleTouchStart, { passive: true });
//     el.addEventListener("touchmove", handleTouchMove, { passive: false });

//     return () => {
//       el.removeEventListener("wheel", handleWheel);
//       el.removeEventListener("touchstart", handleTouchStart);
//       el.removeEventListener("touchmove", handleTouchMove);
//     };
//   }, [handleWheel, handleTouchStart, handleTouchMove]);

//   return (
//     <div
//       id="fullpage-container"
//       ref={containerRef}
//       style={{ height: '100dvh', overflow: 'hidden' }}
//     >
//       {React.Children.map(children, (child, index) => (
//         <AnimatedBlock
//           isActive={currentSection === index}
//           effect="fade-up" // можно задавать индивидуально
//           delay={0.2 * index} // пример задержки
//         >
//           {child}
//         </AnimatedBlock>
//       ))}
//     </div>
//   );
// }

