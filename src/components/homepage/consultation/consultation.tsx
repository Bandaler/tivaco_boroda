import ConsultationForm from "./ConsultationForm/ConsultationForm"; // путь укажи свой
import Marquee from "./marquee/Marquee";

export default async function Consultation() {
  // const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/team-list?_embed', {
  //   cache: 'no-store',
  // });

  // const page = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="consultation-inner">
          <h1>Request a consultation</h1>
          <ConsultationForm />
        </div>
        <Marquee />
      </div>

    </>
  )
}
