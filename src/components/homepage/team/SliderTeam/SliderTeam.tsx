'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';

export default function SliderTeam({ teamList }: { teamList: any[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const [navigationPrevEl, setNavigationPrevEl] = useState<HTMLDivElement | null>(null);
  const [navigationNextEl, setNavigationNextEl] = useState<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current && paginationRef.current) {
      setNavigationPrevEl(prevRef.current);
      setNavigationNextEl(nextRef.current);
      setPaginationEl(paginationRef.current);
    }
  }, []);

  return (
    <div className="slider-team-wrapper">
      <div className="slider-team__head">
        <div className="container">
          <div className="slider-team__head-inner">
            <div className="team-block__title">
              OUR TEAM
            </div>
            {/* Навигация и пагинация сверху */}
            <div className="reviews-arrows" style={{ marginBottom: 20 }}>
              <div ref={prevRef} className="arrow-slider arrow-prev review-arrow" style={{ cursor: 'pointer' }}>
                <Image src="/prev-arr-w.svg" width={20} height={5} alt="prev" />
              </div>
              <div ref={paginationRef} className="pagination swiper-pagination" />
              <div ref={nextRef} className="arrow-slider arrow-next review-arrow" style={{ cursor: 'pointer' }}>
                <Image src="/next-arr-w.svg" width={20} height={5} alt="next" />
              </div>
            </div>
          </div>
        </div>
      </div>


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
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }}
      >
        {teamList.map((member) => {
          const imageUrl = member.acf?.team_photo || '';
          const altText = member.title?.rendered
            ? member.title.rendered.replace(/<[^>]+>/g, '')
            : 'team image';

          return (
            <SwiperSlide key={member.id}>
              <div className="team-card">
                <Link href={member.link}>
                <div className="t-bg"></div>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      width={200}
                      height={200}
                      alt={altText}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <div style={{ width: 200, height: 200, backgroundColor: '#ddd' }}>
                      Нет изображения
                    </div>
                  )}
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
