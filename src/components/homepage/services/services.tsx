import Image from "next/image";
import Link from "next/link";


export default async function Services() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9');
  const page = await res.json();
  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="hero-block services-block">
          <div className="services-block__image">
            <Image src={'/s-bg.png'} width={1500} height={1500} alt="img" />
          </div>
          <div className="services-block__content">
            <div className="hero-block__title">{page.acf?.hm_serv_title}</div>
            <div className="hero-block__description small">{page.acf?.hm_serv_small_descr}</div>
          </div>
          <div className="hero-block__description lg">{page.acf?.hm_serv_lg_descr}</div>
          <div className="service-btns">
            <Link className="learn-more green-btn" href={'javascript:void(0)'} >Learn more</Link>
            <Link className="consultation blue-btn" href={'javascript:void(0)'}> request a consultation </Link>
          </div>
        </div>
      </div>
    </>
  );
}
