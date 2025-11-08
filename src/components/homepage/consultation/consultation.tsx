
import Link from "next/link";
import ConsultationForm from "./ConsultationForm/ConsultationForm"; // путь укажи свой
import Marquee from "./marquee/Marquee";

export default async function Consultation() {
  return (
    <>
      <div className="main-bg sec-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">

        <div className="consultation-inner">
          <div className="consultation-inner--left">
            <h1>Request a consultation</h1>
            <div className="consultation-inner--left-info desktop">
              <div className="consultation-inner--left-info__links">
                <Link href={'/policy'}>
                  privacy policy
                </Link>
                <Link href={'/terms'}>
                  Terms Of Use
                </Link>
              </div>
              <div className="copy">
                Copyright @ 2025 TIVACO PTE. LTD. - All Rights Reserved
              </div>
            </div>
          </div>
          <ConsultationForm />
          <div className="consultation-inner--left-info mobile">
            <div className="consultation-inner--left-info__links">
              <Link href={'/policy'}>
                privacy policy
              </Link>
              <Link href={'/terms'}>
                Terms Of Use
              </Link>
            </div>
            <div className="copy">
              Copyright @ 2025 TIVACO PTE. LTD. - All Rights Reserved
            </div>
          </div>
        </div>
        <Marquee />
      </div>

    </>
  )
}
