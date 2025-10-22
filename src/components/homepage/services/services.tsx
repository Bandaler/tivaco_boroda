import MotionSection from "@/hooks/MotionSection";
import Image from "next/image";
import Link from "next/link";


export default async function Services() {
  const API_URL = process.env.API_SECRET_URL_PAGES;
  const res = await fetch(`${API_URL}/9`, { cache: 'force-cache' });
  const page = await res.json();
  return (
    <>
      <div className="main-bg sec-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="hero-block services-block">
          <div className="services-block__image">
            <Image src={'/s-bg.png'} width={1500} height={1500} alt="img" />
          </div>
          <div className="services-block__content">
            <MotionSection animation="fade-left">
              <div className="hero-block__title">{page.acf?.hm_serv_title}</div>
            </MotionSection>
            <MotionSection animation="fade-right">
              <div className="hero-block__description small">{page.acf?.hm_serv_small_descr}</div>
            </MotionSection>
          </div>
          <MotionSection animation="fade-right">
            <div className="hero-block__description lg">{page.acf?.hm_serv_lg_descr}</div>
          </MotionSection>
          <MotionSection animation="fade-up">
            <div className="service-btns">
              <Link className="learn-more green-btn" href={'javascript:void(0)'} >Learn more</Link>
              <Link className="consultation blue-btn" href="#consult"> request a consultation </Link>
            </div>
          </MotionSection>
        </div>
      </div>
    </>
  );
}
