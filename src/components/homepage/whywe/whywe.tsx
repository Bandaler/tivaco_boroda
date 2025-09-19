import MotionSection from "@/hooks/MotionSection";
import Image from "next/image";

interface WhyIcon {
  url: string;
  alt?: string;
}

interface WhySublistItem {
  hm_why_sublist_item: string;
}

interface WhyItem {
  hm_why_icon?: WhyIcon;
  hm_why_title: string;
  hm_why_sublist?: WhySublistItem[];
  hm_why_sublist_link?: string;
  hm_why_sublist_link_text?: string;
}

interface PageACF {
  hm_why_small?: string;
  hm_why_list?: WhyItem[];
}

interface PageData {
  acf?: PageACF;
}

export default async function WhyWe() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', { cache: 'force-cache' });
  const page: PageData = await res.json();

  return (
    <>
      <div className="main-bg dark"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content why">
        <div className="w-bg">
          <Image src={'/w-bg.png'} width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <div className="why-block">
            <MotionSection animation="fade-up">
              <div className="why-block__small">
                {page.acf?.hm_why_small}
              </div>
            </MotionSection>
            <MotionSection animation="zoom-in">
              <div className="why-tems">
                {page.acf?.hm_why_list?.map((item, idx) => (
                  <div key={idx} className="why-item">
                    <div className="why-item__head">
                      <div className="why-item__icon">
                        {item.hm_why_icon?.url && (
                          <Image
                            src={item.hm_why_icon.url}
                            alt={item.hm_why_icon.alt || item.hm_why_title}
                            width={40}
                            height={40}
                          />
                        )}
                      </div>
                      <div className="why-item__title">
                        {item.hm_why_title}
                      </div>
                    </div>
                    <div className="why-item__sublist">
                      {item.hm_why_sublist?.map((subitem, subidx) => (
                        <div key={subidx} className="why-item__sublist-item">
                          {subitem.hm_why_sublist_item}
                        </div>
                      ))}
                      {item.hm_why_sublist_link && item.hm_why_sublist_link_text && (
                        <a href={item.hm_why_sublist_link} className="why-item__sublist-link">
                          {item.hm_why_sublist_link_text}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </>
  );
}
