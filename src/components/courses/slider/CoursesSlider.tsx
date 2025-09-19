'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    course_preview_image?: string;
    course_preview_description?: string;
  };
}


export default function CoursesSlider({ courseList }: { courseList: Course[] }) {
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
    <div className="slider-team-wrapper courses-slider-wrapper">
      <div className="slider-team__head">
        <div className="container">
          <div className="slider-team__head-inner courses-slider-arr" ref={topContainerRef}>
            <div className="courses-title">Courses</div>

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
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
          1600: { slidesPerView: 3 },
        }}
      >
        {courseList.map((course) => {
          const imageUrl = course.acf?.course_preview_image || '';
          const altText = course.title?.rendered
            ? course.title.rendered.replace(/<[^>]+>/g, '')
            : 'team image';

          return (
            <SwiperSlide key={course.id}>
              <div className="course-card">
                <Link href={`/services/courses/${course.slug}`}>
                  <div className="course-image">
                    {course.acf?.course_preview_image ? (
                      <Image
                        src={imageUrl}
                        width={400}
                        height={250}
                        alt={altText}
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      <div style={{ width: 400, height: 250, backgroundColor: '#ddd' }}>
                        Нет изображения
                      </div>
                    )}
                  </div>
                </Link>
                <div className="courses-body">
                  <Link href={`/services/courses/${course.slug}`}>
                    <div className="course-title" dangerouslySetInnerHTML={{ __html: course.title.rendered }} />
                  </Link>
                  {course.acf?.course_preview_description && (
                    <div className="course-description">
                      {course.acf.course_preview_description}
                    </div>
                  )}
                  <Link href={`/services/courses/${course.slug}`} className="read-more">
                    <span>read more</span>
                    <Image src={'/news-arr.svg'} width={34} height={34} alt="img" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>


          );
        })}
      </Swiper>

      <div className="slider-team__bottom-nav" ref={bottomContainerRef}></div>
    </div>
  );
}
