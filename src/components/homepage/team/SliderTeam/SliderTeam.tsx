'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
// import MotionSection from '@/hooks/MotionSection';

interface TeamMember {
  id: number;
  slug: string; // <-- добавлено
  link: string;
  title: {
    rendered: string;
  };
  acf: {
    team_photo?: string;
    position?: string;
  };
}

export default function SliderTeam({ teamList }: { teamList: TeamMember[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  const [navigationPrevEl, setNavigationPrevEl] = useState<HTMLDivElement | null>(null);
  const [navigationNextEl, setNavigationNextEl] = useState<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

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
    <div className="slider-team-wrapper">
      <div className="slider-team__head">
        <div className="container">
          {/* <MotionSection animation="fade-up"> */}
            <div className="slider-team__head-inner" ref={topContainerRef}>
              <div className="team-block__title">OUR TEAM</div>
              <div className="reviews-arrows" ref={arrowsRef} style={{ marginBottom: 20 }}>
                <div ref={prevRef} className="arrow-slider arrow-prev review-arrow" style={{ cursor: 'pointer' }}>
                  <Image src="/prev-arr-w.svg" width={20} height={5} alt="prev" />
                </div>
                <div ref={paginationRef} className="pagination swiper-pagination" />
                <div ref={nextRef} className="arrow-slider arrow-next review-arrow" style={{ cursor: 'pointer' }}>
                  <Image src="/next-arr-w.svg" width={20} height={5} alt="next" />
                </div>
              </div>
            </div>
          {/* </MotionSection> */}
        </div>
      </div>
      {/* <MotionSection animation="zoom-in"> */}
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
            320: { slidesPerView: 'auto', spaceBetween: 18 },
            768: { slidesPerView: 'auto', spaceBetween: 18 },
            1024: { slidesPerView: 1 },
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
                  <Link href={`/about/team/${member.slug}`}>
                    <div className="team-arrow">
                      <Image src={'/tar.svg'} width={44} height={44} alt={member.title.rendered} />
                    </div>
                    <div className="team-info">
                      <div className="team-name" dangerouslySetInnerHTML={{ __html: member.title.rendered }} />
                      <div className="team-position">{member.acf?.position}</div>
                    </div>
                    <div className="t-bg"></div>
                    {member.acf?.team_photo ? (
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
      {/* </MotionSection> */}


      <div className="slider-team__bottom-nav" ref={bottomContainerRef}></div>
    </div>
  );
}
