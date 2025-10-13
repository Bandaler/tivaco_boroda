'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Image from 'next/image';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

type ReviewSlide = {
  slider_review_text: string;
  slider_review_author: string;
};

export default function ReviewsSlider({ slides }: { slides: ReviewSlide[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // состояние для передачи в Swiper, обновится после первого рендера
  const [navigationPrevEl, setNavigationPrevEl] = useState<HTMLDivElement | null>(null);
  const [navigationNextEl, setNavigationNextEl] = useState<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current && paginationRef.current) {
      setNavigationPrevEl(prevRef.current);
      setNavigationNextEl(nextRef.current);
      setPaginationEl(paginationRef.current);
    }
  }, []); // только один раз при монтировании

  return (
    <div className="reviews-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        slidesPerView={2}
        navigation={{
          prevEl: navigationPrevEl,
          nextEl: navigationNextEl,
        }}
        pagination={{
          el: paginationEl,
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="review-slide">
              <p className="review-slide__text">{item.slider_review_text}</p>
              <p className="review-slide__author">{item.slider_review_author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кастомные стрелки и пагинация */}
      <div className="reviews-arrows">
        <div ref={prevRef} className="arrow-slider arrow-prev review-arrow">
          <Image src="/prev-arr.svg" width={20} height={5} alt="prev" />
        </div>
        <div ref={paginationRef} className="pagination swiper-pagination" />
        <div ref={nextRef} className="arrow-slider arrow-next review-arrow">
          <Image src="/next-arr.svg" width={20} height={5} alt="next" />
        </div>
      </div>
    </div>
  );
}
