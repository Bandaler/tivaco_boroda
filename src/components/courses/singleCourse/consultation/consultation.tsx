import ConsultationForm from "./ConsultationForm/ConsultationForm"; // путь укажи свой
import Marquee from "./marquee/Marquee";

export default function Consultation({ courseTitle }: { courseTitle: string }) {
  // const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/team-list?_embed', {
  //   cache: 'no-store',
  // });

  // const page = await res.json();

  return (
    <>
      <div className="main-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="consultation-inner">
          <h1>sign up for a course</h1>
          <ConsultationForm courseTitle={courseTitle} />
        </div>
        <Marquee />
      </div>

    </>
  )
}
