

import Image from "next/image";
import LottieArrow from "./littiearrow/LottieArrow";

export default async function Mainscreen() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', { cache: 'force-cache'} );
  const page = await res.json();
  return (
    <>
     <div className="main-bg"></div>
      <div className="secondary-bg"></div>
      <div className="arrow">
        <Image src={'/arrow.png'} width={1000} height={1000} alt="image" className="static-arrow" />
      </div>
       <LottieArrow />
      <div className="page-content">
        <div className="hero-block ms">
          <div className="hero-block__title" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000">{page.acf?.hm_title}</div>
          <div className="hero-block__description" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000">{page.acf?.hm_description}</div>
        </div>
        <div className="scroll-info">
          <span>Scroll down to see our services</span>
          <Image src={'/scr.svg'} width={34} height={34} alt="img" />
        </div>
      </div>
    </>
  );
}
