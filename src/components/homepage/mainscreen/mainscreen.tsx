

import Image from "next/image";

export default async function Mainscreen() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9');
  const page = await res.json();
  return (
    <>
     <div className="main-bg"></div>
      <div className="secondary-bg"></div>
      <div className="arrow">
        <Image src={'/arrow.png'} width={1000} height={1000} alt="image" />
      </div>
      <div className="page-content">
        <div className="hero-block">
          <div className="hero-block__title">{page.acf?.hm_title}</div>
          <div className="hero-block__description">{page.acf?.hm_description}</div>
        </div>
      </div>
    </>
  );
}
