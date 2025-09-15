import MotionSection from "@/hooks/MotionSection";
import Image from "next/image";
import Link from "next/link";

type AdvantageItem = {
  advantages_list_image: string;
  advantages_list_descr: string;
};

export default async function Advantages() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', { cache: 'force-cache' });
  const page = await res.json();
  const advantages: AdvantageItem[] = page.acf?.advantages_list || [];

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="w-bg">
          <Image src={'/w-bg.png'} width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <div className="advantages-block">
            <MotionSection animation="fade-down">
              <div className="advantages-block__title">
                {page.acf?.hm_adv_title}
              </div>
              <div className="advantages-block__description">
                {page.acf?.hm_adv_description}
              </div>
            </MotionSection>
            <MotionSection animation="fade-up">
              <ul className="advantages-items">
                {advantages.map((item, index) => (
                  <li className="advantages-item" key={index}>
                    <div className="advantages-item__image">
                      <Image
                        src={item.advantages_list_image}
                        width={500}
                        height={500}
                        alt={item.advantages_list_descr}
                      />
                    </div>
                    <div className="advantages-item__description">
                      {item.advantages_list_descr}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="advantages-btns">
                <Link className="green-btn" href={'javascript:void(0)'} >Learn more</Link>
                <Link className="blue-btn" href="#consult"> request a consultation </Link>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </>
  );
}
