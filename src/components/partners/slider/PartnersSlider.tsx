'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface LogoItem {
  partners_logo?: { url?: string; alt?: string } | string;
}

interface Partner {
  id: number;
  acf?: {
    partners_logos?: LogoItem[];
  };
}

export default function PartnersSlider({ partnersList }: { partnersList: Partner[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  const [navigationPrevEl, setNavigationPrevEl] = useState<HTMLDivElement | null>(null);
  const [navigationNextEl, setNavigationNextEl] = useState<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  const DEFAULT_IMG = '/default.svg'; // <-- поменяй путь на свою дефолтную картинку

  const resolveLogoUrl = (item?: LogoItem) => {
    if (!item) return DEFAULT_IMG;
    const logo = item.partners_logo;
    if (!logo) return DEFAULT_IMG;
    if (typeof logo === 'string') return logo;
    // object case
    if ('url' in logo && logo.url) return logo.url;

   
    if ('src' in logo && typeof logo.src === 'string') return logo.src;

    return DEFAULT_IMG;
  };


  const resolveAlt = (item?: LogoItem, partnerId?: number, idx?: number) => {
    if (!item) return `partner-${partnerId ?? 'unknown'}`;
    const logo = item.partners_logo;
    if (!logo) return `partner-${partnerId ?? 'unknown'}`;
    if (typeof logo === 'string') return `partner-${partnerId ?? 'unknown'}-${idx ?? 0}`;
    return logo.alt ?? `partner-${partnerId ?? 'unknown'}-${idx ?? 0}`;
  };

  useEffect(() => {
    const moveArrows = () => {
      if (!arrowsRef.current || !topContainerRef.current || !bottomContainerRef.current) return;

      const width = window.innerWidth;

      if (width <= 992) {
        if (!bottomContainerRef.current.contains(arrowsRef.current)) {
          bottomContainerRef.current.appendChild(arrowsRef.current);
        }
      } else {
        if (!topContainerRef.current.contains(arrowsRef.current)) {
          topContainerRef.current.appendChild(arrowsRef.current);
        }
      }
    };

    moveArrows();
    window.addEventListener('resize', moveArrows);
    return () => window.removeEventListener('resize', moveArrows);
  }, []);

  useEffect(() => {
    if (prevRef.current && nextRef.current && paginationRef.current) {
      setNavigationPrevEl(prevRef.current);
      setNavigationNextEl(nextRef.current);
      setPaginationEl(paginationRef.current);
    }
  }, []);

  return (
    <div className="slider-team-wrapper partners-slider-wrapper courses-slider-wrapper events-slider-wrapper">
      <div className="slider-team__head">
        <div className="container">
          <div className="slider-team__head-inner " ref={topContainerRef}>
            <div className="courses-title events-title">Our partners</div>

            {partnersList.length > 0 && (
              <div className="reviews-arrows" ref={arrowsRef} style={{ marginBottom: 20 }}>
                <div ref={prevRef} className="arrow-slider arrow-prev review-arrow" style={{ cursor: 'pointer' }}>
                  <Image src="/prev-arr-w.svg" width={20} height={5} alt="prev" />
                </div>
                <div ref={paginationRef} className="pagination swiper-pagination" />
                <div ref={nextRef} className="arrow-slider arrow-next review-arrow" style={{ cursor: 'pointer' }}>
                  <Image src="/next-arr-w.svg" width={20} height={5} alt="next" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {partnersList.length === 0 ? (
        <div className="no-events">No partners</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          navigation={{
            prevEl: navigationPrevEl,
            nextEl: navigationNextEl,
          }}
          pagination={{
            el: paginationEl,
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
            1600: { slidesPerView: 3 },
          }}
        >
          {partnersList.map((partner) => {
            const logos = partner.acf?.partners_logos ?? [];

            return (
              <SwiperSlide key={partner.id}>
                <div className="partner-card">
                  <div className="partner-card__body">
                    <div className="partner-image">
                      {logos.length > 0 ? (
                        logos.map((item, idx) => {
                          const src = resolveLogoUrl(item);
                          const alt = resolveAlt(item, partner.id, idx);
                          return (
                            <div className="partner-image__item" key={idx} style={{ display: 'inline-block', marginRight: 12 }}>
                              {/* Используем next/image с unoptimized, чтобы не требовать конфиг remotePatterns.
                                  Если у тебя настроены remotePatterns в next.config.js — можно убрать unoptimized. */}
                              <Image
                                src={src}
                                alt={alt}
                                width={150}
                                height={80}
                                loading="lazy"
                                unoptimized
                                className="partner-image__img"
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="partner-image__item">
                          <Image src={DEFAULT_IMG} alt="default partner" width={150} height={80} loading="lazy" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="slider-team__bottom-nav" ref={bottomContainerRef}></div>
      <div className="service-btns partners-btns">
        <Link className="learn-more green-btn" href={'javascript:void(0)'} >view reviews</Link>
        <Link className="consultation blue-btn" href={'/'}> request a consultation </Link>
      </div>
    </div>
  );
}
