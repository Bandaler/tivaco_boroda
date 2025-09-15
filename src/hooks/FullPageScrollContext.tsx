"use client";
import { createContext, useContext } from "react";

export const FullPageScrollContext = createContext<{ currentSection: number }>({
  currentSection: 0,
});

export function useFullPageScroll() {
  return useContext(FullPageScrollContext);
}
