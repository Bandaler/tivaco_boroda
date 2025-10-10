"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";

interface SlideData {
  upperTitle: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  slug: string; // добавляем slug для ссылки
}

export default function PortfolioSliderClient({ data }: { data: SlideData[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  if (!data?.length) return null;

  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content portfolio-slider">
        <div className="container padding-0">
          <div className="services-page__inner portfolio-page__inner">
            <Breadcrumbs />
            <div className="h1">Portfolio</div>
            {swiperReady && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                grabCursor
                // autoplay={{
                //   delay: 5000,
                //   disableOnInteraction: false,
                // }}
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
                className="portfolio-swiper"
              >
                {data.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <Link href={`/portfolio/${slide.slug}`} className="block h-full">
                      <div className="slide-item p-8 rounded-2xl shadow-lg bg-white flex flex-col h-full">
                        {slide.upperTitle && (
                          <div className="portfolio-swiper_upper-title">
                            {slide.upperTitle}
                          </div>
                        )}
                        {slide.title && (
                          <div className="portfolio-swiper__title">{slide.title}</div>
                        )}
                        {slide.subtitle && (
                          <div className="portfolio-swiper_subtitle">
                            {slide.subtitle}
                          </div>
                        )}
                        {slide.description && (
                          <div className="portfolio-swiper_description">
                            {slide.description}
                          </div>
                        )}
                        {slide.tag && (
                          <div className="portfolio-swiper_tag">
                            {slide.tag}
                          </div>
                        )}
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

          </div>

          {/* Навигация */}
          <div className="custom-swiper-navigation portfolio-navigation">
            <div ref={prevRef} className="arrow-prev custom-swiper-navigation__arrow">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="21.75" transform="matrix(-1 0 0 1 44 0)" stroke="#03002A" strokeWidth="0.5" />
                <path d="M13.3234 22.2652C13.177 22.1187 13.177 21.8813 13.3234 21.7348L15.7099 19.3483C15.8563 19.2019 16.0938 19.2019 16.2402 19.3483C16.3867 19.4948 16.3867 19.7322 16.2402 19.8787L14.1189 22L16.2402 24.1213C16.3867 24.2678 16.3867 24.5052 16.2402 24.6517C16.0938 24.7981 15.8563 24.7981 15.7099 24.6517L13.3234 22.2652ZM30.4121 22V22.375H13.5886V22V21.625H30.4121V22Z" fill="#03002A" />
              </svg>

            </div>
            <div ref={paginationRef} className="bullets custom-swiper-navigation__bullets"></div>
            <div ref={nextRef} className="arrow-next custom-swiper-navigation__arrow">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="21.75" stroke="#03002A" strokeWidth="0.5" />
                <path d="M30.6766 22.2652C30.823 22.1187 30.823 21.8813 30.6766 21.7348L28.2901 19.3483C28.1437 19.2019 27.9062 19.2019 27.7598 19.3483C27.6133 19.4948 27.6133 19.7322 27.7598 19.8787L29.8811 22L27.7598 24.1213C27.6133 24.2678 27.6133 24.5052 27.7598 24.6517C27.9062 24.7981 28.1437 24.7981 28.2901 24.6517L30.6766 22.2652ZM13.5879 22V22.375H30.4114V22V21.625H13.5879V22Z" fill="#03002A" />
              </svg>

            </div>
          </div>
        </div>
      </div >
    </>
  );
}
