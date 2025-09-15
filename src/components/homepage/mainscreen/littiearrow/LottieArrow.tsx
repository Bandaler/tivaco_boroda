"use client";

// import Lottie from "lottie-react";
// import arrowAnimation from "@/data/arrow.json";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function LottieArrow() {
  return (
    <div className="arrow">
      {/* <Lottie animationData={arrowAnimation} loop={false} autoplay  /> */}
      <DotLottieReact
      src="/arrow.json"
      loop={false}
      autoplay
    />
    </div>
  );
}
