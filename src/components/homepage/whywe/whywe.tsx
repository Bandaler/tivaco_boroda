import Image from "next/image";

export default async function WhyWe() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', {
    cache: 'no-store',
  });
  const page = await res.json();

  return (
    <>
      <div className="main-bg dark"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="w-bg">
          <Image src={'/w-bg.png'} width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <div className="why-block">
            <div className="why-block__small">
              {page.acf?.hm_why_small}
            </div>
            <div className="why-tems">
              {page.acf?.hm_why_list?.map((item: any, idx: number) => (
                <div key={idx} className="why-item">
                  <div className="why-item__head">
                    <div className="why-item__icon">
                      {/* SVG иконка */}
                      {item.hm_why_icon?.url && (
                        <img
                          src={item.hm_why_icon.url}
                          alt={item.hm_why_icon.alt || item.hm_why_title}
                          width={40} // или нужный размер
                          height={40}
                          style={{ display: 'block' }}
                        />
                      )}
                    </div>
                    <div className="why-item__title">
                      {item.hm_why_title}
                    </div>
                  </div>
                  <div className="why-item__sublist">
                    {item.hm_why_sublist?.map((subitem: any, subidx: number) => (
                      <div key={subidx} className="why-item__sublist-item">
                        {subitem.hm_why_sublist_item}
                      </div>
                    ))}
                    {/* Если есть ссылка */}
                    {item.hm_why_sublist_link && item.hm_why_sublist_link_text && (
                      <a href={item.hm_why_sublist_link} className="why-item__sublist-link">
                        {item.hm_why_sublist_link_text}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
