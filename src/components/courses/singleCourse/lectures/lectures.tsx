
'use client';

import MotionSection from '@/hooks/MotionSection';
// import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import { useState } from 'react';

type CourseTab = {
  course_lector_name: string;
  course_lector_position: string;
  course_lector_description: string;
};

export default function CourseTabsLectures({ tabs }: { tabs: CourseTab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTab = tabs?.[activeIndex];

  if (!currentTab) return null;

  return (
    <>
      <div className={`main-bg light`}></div>
      <div className={`secondary-bg `}></div>
      <div className="page-content">
        <div className="container">
          <div className="course-structure__inner">
            {/* <Breadcrumbs current={course.title.rendered} /> */}
            <div className="hero-course">
              {/* <h1
                    className={`h1`}
                    dangerouslySetInnerHTML={{ __html: course.title.rendered }}
                  /> */}

            </div>
            <MotionSection animation="fade-up">
              <div className="course__head">
                <div className="course__title">
                  lecturers
                </div>
                <Link className='blend-link desktop' href="#course-consult">
                  sign up for a course
                </Link>
              </div>
            </MotionSection>
            <MotionSection animation="zoom-out">
              <div className="course-tabs">
                <div className="course-tabs__nav">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`course-tabs__button ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {tab.course_lector_name}
                    </button>
                  ))}
                </div>

                <div className="course-tabs__content">
                  {currentTab.course_lector_position && (
                    <div className="course-tabs__lecture-position">
                      {currentTab.course_lector_position}
                    </div>
                  )}

                  {currentTab.course_lector_description && (
                    <div className="course-tabs__lecture-description">
                      {currentTab.course_lector_description}
                    </div>
                  )}

                  {/* 
                {currentTab.course_structure_tab_points && currentTab.course_structure_tab_points.length > 0 && (
                  <ul className="course-tabs__list">
                    {currentTab.course_structure_tab_points.map((point, idx) => (
                      <li key={idx} className="course-tabs__point">
                        {point.course_structure_tab_point}
                      </li>
                    ))}
                  </ul>
                )} */}

                </div>
              </div>
            </MotionSection>
            <Link className='blend-link mobile' href="#course-consult">
              sign up for a course
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
