import Image from "next/image";
import LottieArrow from "./littiearrow/LottieArrow";

interface Advantage {
  ms_advantages_title: string;
  ms_advantages_description: string;
  ms_advantages_link?: string;
  ms_advantages_link_text?: string;
}

export default async function Mainscreen() {
  const res = await fetch("http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9", {
    cache: "force-cache",
  });
  const page = await res.json();

  const advantages: Advantage[] = page.acf?.ms_advantages || [];

  return (
    <>
      <div className="main-bg"></div>
      <div className="secondary-bg"></div>

      <div className="arrow">
        <Image
          src={"/arrow.png"}
          width={1000}
          height={1000}
          alt="image"
          className="static-arrow"
        />
      </div>

      <LottieArrow />

      <div className="page-content">
        <div className="hero-block ms">
          <div
            className="hero-block__title"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="2000"
          >
            {page.acf?.hm_title}
          </div>

          <div
            className="hero-block__description"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="2000"
          >
            {page.acf?.hm_description}
          </div>

          {advantages.length > 0 && (
            <div className="ms-advantages" data-aos="fade-up" data-aos-delay="1200">
              {advantages.map((item, index) => (
                <div key={index} className="ms-advantage-item">
                  <div className="ms-advantage-title">{item.ms_advantages_title}</div>
                  <div className="ms-advantage-description">
                    {item.ms_advantages_description}
                    {item.ms_advantages_link && item.ms_advantages_link_text && (
                      <>
                        {" "}
                        <a
                          href={item.ms_advantages_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ms-advantage-link"
                        >
                          {item.ms_advantages_link_text}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="scroll-info">
          <span>Scroll down to see our services</span>
          <Image src={"/scr.svg"} width={34} height={34} alt="img" />
        </div>
      </div>
    </>
  );
}
