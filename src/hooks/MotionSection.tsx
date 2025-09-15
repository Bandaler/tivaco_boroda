"use client";
import { motion, useInView, Variants, TargetAndTransition } from "framer-motion";
import { useRef } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out";

interface MotionSectionProps {
  children: React.ReactNode;
  rootSelector?: string;
  animation?: AnimationType;
  delay?: number;
}

export default function MotionSection({
  children,
  rootSelector = "#fullpage-container",
  animation = "fade-up",
  delay = 0,
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // ref для root
  const rootRef = useRef<Element | null>(null);
  if (typeof document !== "undefined" && !rootRef.current) {
    rootRef.current = document.querySelector(rootSelector);
  }

  const inView = useInView(ref, { amount: 0.4, root: rootRef });

  const variants: Record<AnimationType, Variants> = {
    "fade-up": {
      hidden: { opacity: 0, y: 40 } as TargetAndTransition,
      visible: { opacity: 1, y: 0 } as TargetAndTransition,
    },
    "fade-down": {
      hidden: { opacity: 0, y: -40 } as TargetAndTransition,
      visible: { opacity: 1, y: 0 } as TargetAndTransition,
    },
    "fade-left": {
      hidden: { opacity: 0, x: -40 } as TargetAndTransition,
      visible: { opacity: 1, x: 0 } as TargetAndTransition,
    },
    "fade-right": {
      hidden: { opacity: 0, x: 40 } as TargetAndTransition,
      visible: { opacity: 1, x: 0 } as TargetAndTransition,
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.8 } as TargetAndTransition,
      visible: { opacity: 1, scale: 1 } as TargetAndTransition,
    },
    "zoom-out": {
      hidden: { opacity: 0, scale: 1.2 } as TargetAndTransition,
      visible: { opacity: 1, scale: 1 } as TargetAndTransition,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
