
'use client';

import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import { Course } from '@/lib/menutypes/types';
import MotionSection from '@/hooks/MotionSection';

export default function CourseStructure({ course }: { course: Course }) {
  const isLightTheme = course.acf?.theme_color === 'Светлая';

  return (
    <>
      <div className={`main-bg ${isLightTheme ? 'dark' : ''}`}></div>
      <div className={`secondary-bg ${isLightTheme ? 'light-bg' : ''}`}></div>
      <div className="page-content">
        {isLightTheme && (
          <div className="w-bg">
            <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
          </div>
        )}

        <div className="container">
          <div className="course-structure__inner">
            <Breadcrumbs current={course.title.rendered} />
            <div className="hero-course">
              <div className="course-ms__image">
                <Image src={course.acf?.course_preview_image || ''} width={750} height={448} alt='img' />
              </div>
              <MotionSection animation="fade-left">
                <h1
                  className={`h1 ${isLightTheme ? 'light-bg' : ''}`}
                  dangerouslySetInnerHTML={{ __html: course.title.rendered }}
                />
              </MotionSection>

              <div className="course-content">
                <MotionSection animation="fade-down">
                  <div className="course-time">
                    Education time:<br />
                    {course.acf?.course_ms_hours} / {course.acf?.course_ms_long}
                  </div>
                </MotionSection>
                <MotionSection animation="fade-right">
                  <div className="course-description">
                    {course.acf?.course_ms_description}
                  </div>
                </MotionSection>
              </div>
            </div>
            <MotionSection animation="fade-up">
              <div className="service-btns">
                <Link className="learn-more green-btn" href="#course-more" >Learn more</Link>
                <Link className="consultation blue-btn" href="#course-consult"> request a consultation </Link>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </>
  );
}