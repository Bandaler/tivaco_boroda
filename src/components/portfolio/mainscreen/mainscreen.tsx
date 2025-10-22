import PortfolioSliderClient from "./PortfolioSliderClient";


interface Portfolio {
  id: number;
  slug: string;
  acf: {
    portfolio_slider_upper_title?: string;
    portfolio_slider_title?: string;
    portfolio_slider_subtitle?: string;
    portfolio_slider_description?: string;
    portfolio_slider_tag?: string;
  };
}

export default async function Mainscreen() {
  const API_URL = process.env.API_SECRET_URL_PORTFOLIO
  const res = await fetch(
    `${API_URL}?per_page=100`,
   { cache: 'force-cache' }
  );

  if (!res.ok) {
    console.error("Ошибка загрузки данных:", res.status);
    return null;
  }

  const data: Portfolio[] = await res.json();

  // Преобразуем массив к нужной структуре, включая slug
  const sliderData = data.map((item) => ({
    upperTitle: item.acf?.portfolio_slider_upper_title || "",
    title: item.acf?.portfolio_slider_title || "",
    subtitle: item.acf?.portfolio_slider_subtitle || "",
    description: item.acf?.portfolio_slider_description || "",
    tag: item.acf?.portfolio_slider_tag || "",
    slug: item.slug || "", // 👈 добавляем slug
  }));

  return <PortfolioSliderClient data={sliderData} />;
}
