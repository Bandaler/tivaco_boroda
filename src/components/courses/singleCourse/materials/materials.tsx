
'use client';

// import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import MotionSection from '@/hooks/MotionSection';

type CourseTab = {
  course_lecture_name: string;
  course_lecture_files?: { course_lecture_file: string; course_lecture_file_name: string }[];
};

export default function CourseTabsMaterials({ tabs }: { tabs: CourseTab[] }) {
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
            <MotionSection animation="fade-down">
              <div className="course__head">
                <div className="course__title">
                  Course materials
                </div>
                {/* <Link className='blend-link' href={'javascript:void(0)'}>
                sign up for a course
              </Link> */}
              </div>
            </MotionSection>
            <MotionSection animation="fade-up">
              <div className="course-tabs">
                <div className="course-tabs__nav">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`course-tabs__button ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {tab.course_lecture_name}
                    </button>
                  ))}
                </div>

                <div className="course-tabs__content">
                  {/* {currentTab.course_lector_position && (
                  <div className="course-tabs__lecture-position">
                    {currentTab.course_lector_position}
                  </div>
                )} */}


                  {currentTab.course_lecture_files && currentTab.course_lecture_files.length > 0 && (
                    <ul className="course-files__list">
                      {currentTab.course_lecture_files.map((point, idx) => (
                        <li key={idx} className="course-files__point">
                          <Link href={point.course_lecture_file} target='_blank'>
                            <Image src={'/file2.svg'} width={97} height={105} alt='file' />
                            {point.course_lecture_file_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            </MotionSection>

          </div>
        </div>
      </div>
    </>
  );
}
