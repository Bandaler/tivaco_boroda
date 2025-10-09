"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface WhySliderPoint {
  why_slider_point: string;
}

interface WhySliderItem {
  why_slider_under_title_text: string;
  why_slider_title: string;
  why_slider_points?: WhySliderPoint[];
  why_slider_link?: string;
  why_slider_link_text?: string;
}

interface WhySliderProps {
  data: WhySliderItem[];
  hmWhySmall?: string;
}

export default function WhySliderClient({ data, hmWhySmall }: WhySliderProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    // Даем Swiper и DOM полностью загрузиться
    setSwiperReady(true);
  }, []);

  if (!data?.length) return null;

  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>

      <div className="page-content why">
        <div className="container padding-0">
          <div className="why-block">
            {hmWhySmall && <div className="why-block__small">{hmWhySmall}</div>}

            {swiperReady && (
              <Swiper
                modules={[Navigation, Pagination]}
                grabCursor
                centeredSlides
                slidesPerView={3}
                spaceBetween={45}
                loop
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                  bulletClass: "custom-bullet",
                  bulletActiveClass: "custom-bullet-active",
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1050: { slidesPerView: 3 },
                }}
                className="why-swiper"
              >
                {data.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="slide-item bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col justify-between">
                      <div>
                        <div className="text-sm uppercase text-gray-500 mb-2 slide-item_subtitle">{slide.why_slider_under_title_text}</div>
                        <div className="text-4xl font-bold mb-6 slide-item__title">{slide.why_slider_title}</div>
                        <ul className="space-y-2 text-left slide-item__snugs">
                          {slide.why_slider_points?.map((point, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: point.why_slider_point }} className="text-base leading-snug" />
                          ))}
                        </ul>
                      </div>
                      {slide.why_slider_link && slide.why_slider_link_text && (
                        <div className="mt-6 why_slider_link">
                          <a href={slide.why_slider_link}>{slide.why_slider_link_text}</a>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* кастомные стрелки и bullets */}
            <div className="custom-swiper-navigation">
              <div ref={prevRef} className="custom-swiper-navigation__arrow custom-swiper-navigation__arrow-prev">
                <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="21.75" transform="matrix(-1 0 0 1 44.5 0)" stroke="#03002A" strokeWidth="0.5" />
                  <path d="M13.8234 22.2652C13.677 22.1187 13.677 21.8813 13.8234 21.7348L16.2099 19.3483C16.3563 19.2019 16.5938 19.2019 16.7402 19.3483C16.8867 19.4948 16.8867 19.7322 16.7402 19.8787L14.6189 22L16.7402 24.1213C16.8867 24.2678 16.8867 24.5052 16.7402 24.6517C16.5938 24.7981 16.3563 24.7981 16.2099 24.6517L13.8234 22.2652ZM30.9121 22V22.375H14.0886V22V21.625H30.9121V22Z" fill="#03002A" />
                </svg>

              </div>
              <div ref={paginationRef} className="custom-swiper-navigation__bullets"></div>
              <div ref={nextRef} className="custom-swiper-navigation__arrow custom-swiper-navigation__arrow-next">
                <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22.5" cy="22" r="21.75" stroke="#03002A" strokeWidth="0.5" />
                  <path d="M31.1766 22.2652C31.323 22.1187 31.323 21.8813 31.1766 21.7348L28.7901 19.3483C28.6437 19.2019 28.4062 19.2019 28.2598 19.3483C28.1133 19.4948 28.1133 19.7322 28.2598 19.8787L30.3811 22L28.2598 24.1213C28.1133 24.2678 28.1133 24.5052 28.2598 24.6517C28.4062 24.7981 28.6437 24.7981 28.7901 24.6517L31.1766 22.2652ZM14.0879 22V22.375H30.9114V22V21.625H14.0879V22Z" fill="#03002A" />
                </svg>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
