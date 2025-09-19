'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

interface Event {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    event_date?: string;
    event_time?: string;
    event_location?: string;
    short_ppreview?: string;
    event_speakers?: { event_speacker_photo: string; event_speacker_name: string; event_speacker_position: string }[];
  };
}


export default function EventsSlider({ eventsList }: { eventsList: Event[] }) {
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
    <div className="slider-team-wrapper courses-slider-wrapper events-slider-wrapper">
      <div className="slider-team__head">
        <div className="container">
          <Breadcrumbs />
          <div className="slider-team__head-inner courses-slider-arr" ref={topContainerRef}>
            <div className="courses-title events-title">Events</div>

            {eventsList.length > 0 && (
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

      {eventsList.length === 0 ? (
        <div className="no-events">
          No events are planned in the near future
        </div>
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
            320: { slidesPerView: 'auto', spaceBetween: 18 },
            768: { slidesPerView: 'auto' },
            1024: { slidesPerView: 1 },
            1300: { slidesPerView: 3 },
          }}

        >
          {eventsList.map((event) => {

            return (
              <SwiperSlide key={event.id}>
                <div className="event-card">
                  <div className="event-card__head">
                    {event.acf?.event_date && (
                      <div className="event-date">
                        {event.acf.event_date}
                      </div>
                    )}
                    {event.acf?.event_time && (
                      <div className="event-time">
                        {event.acf.event_time}
                      </div>
                    )}
                    {event.acf?.event_location && (
                      <div className="event-location">
                        {event.acf.event_location}
                      </div>
                    )}
                  </div>
                  <div className="event-card__body">
                    <div className="event-title" dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
                    {event.acf?.short_ppreview && (
                      <div className="event-description">
                        {event.acf.short_ppreview}
                      </div>
                    )}
                    <Link href={`/events/${event.slug}`} className="read-more">
                      <span>read more</span>
                      <Image src={'/news-arr.svg'} width={34} height={34} alt="img" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="slider-team__bottom-nav mobile-ev__nav" ref={bottomContainerRef}></div>
    </div>
  );

}
