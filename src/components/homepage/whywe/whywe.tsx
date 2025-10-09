import WhySliderClient from "./WhySliderClient";


interface WhySliderPoint {
  why_slider_point: string;
}

interface WhySliderItem {
  why_slider_under_title_text: string;
  why_slider_title: string;
  why_slider_points?: WhySliderPoint[];
  why_slider_link?: string;
  why_slider_link_text?: string;
}

interface PageData {
  acf?: {
    why_slider?: WhySliderItem[];
    hm_why_small?: string; // добавляем сюда
  };
}

export default async function WhySliderServer() {
  const res = await fetch("http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9", { cache: 'force-cache' });

  if (!res.ok) {
    console.error("Ошибка загрузки данных:", res.status);
    return null;
  }

  const page: PageData = await res.json();
  const sliderData = page.acf?.why_slider || [];
  const hmWhySmall = page.acf?.hm_why_small || "";

  if (!sliderData.length) {
    console.warn("Слайдер пуст");
    return null;
  }

  // прокидываем hmWhySmall в клиентский компонент
  return <WhySliderClient data={sliderData} hmWhySmall={hmWhySmall} />;
}
