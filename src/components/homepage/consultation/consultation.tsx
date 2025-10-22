
import ConsultationForm from "./ConsultationForm/ConsultationForm"; // путь укажи свой
import Marquee from "./marquee/Marquee";

export default async function Consultation() {
  return (
    <>
      <div className="main-bg sec-bg"></div>
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
