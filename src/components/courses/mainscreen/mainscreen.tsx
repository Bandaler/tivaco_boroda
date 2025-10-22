import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CoursesSlider from "../slider/CoursesSlider";
import Image from "next/image";

export default async function CoursesHomepage() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_COURSES;
  const res = await fetch(`${API_URL}?_embed`, { cache: 'force-cache' });

  const courseList = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content couses-page__content">
        <div className="container">
          <Breadcrumbs />
        </div>
        <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <CoursesSlider courseList={courseList} />

        </div>

      </div>
    </>
  );
}
