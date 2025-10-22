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
    hm_why_small?: string; 
  };
}

export default async function WhySliderServer() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PAGES;
  const res = await fetch(`${API_URL}/9`, { cache: 'force-cache' });

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
