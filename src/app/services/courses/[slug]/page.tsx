// app/services/[slug]/page.tsx

import Consultation from '@/components/courses/singleCourse/consultation/consultation';
import CourseTabsLectures from '@/components/courses/singleCourse/lectures/lectures';
import CourseLayout from '@/components/courses/singleCourse/mainscreen/mainscreen';
import CourseTabsMaterials from '@/components/courses/singleCourse/materials/materials';
import CourseTabsStructure from '@/components/courses/singleCourse/structure/structure';
import FullPageScrollWrapper from '@/components/FullPageWrapper/FullPageWrapper';

import { Course } from '@/lib/menutypes/types';


export async function generateStaticParams() {
  const API_URL = process.env.API_SECRET_URL_COURSES;
  const res = await fetch(`${API_URL}?per_page=100`);
  const data: Course[] = await res.json();

  return data.map(course => ({
    slug: course.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.API_SECRET_URL_COURSES;
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: Course[] = await res.json();
  const course = data[0];

  if (!course) return { title: "Team not found | Tivaco" };

  return {
    title: `${course.title.rendered} | Tivaco`,
    description: course.content.rendered || "Event page",
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.API_SECRET_URL_COURSES;
  const { slug } = await params;

  const res = await fetch(`${API_URL}?slug=${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data: Course[] = await res.json();
  const course = data[0];


  return (

      <FullPageScrollWrapper >
        <section className={`section`}>
          <CourseLayout course={course} />
        </section>
        <section className={`section`} id='course-more'>
          <CourseTabsStructure tabs={course.acf?.course_structure_tabs || []} />
        </section>
        <section className={`section`}>
          <CourseTabsLectures tabs={course.acf?.course_lectors || []} />
        </section>
        <section className={`section`}>
          <CourseTabsMaterials tabs={course.acf?.course_materials || []} />
        </section>
        <section className={`section`} id='course-consult'>
          <Consultation courseTitle={course.title.rendered} />
        </section>
      </FullPageScrollWrapper>



  );
}


