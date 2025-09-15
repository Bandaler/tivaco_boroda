"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Tab {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    news_image?: string | null;
  };
}


interface Category {
  id: number;
  slug: string;
  title: string;
  tabs: Tab[];
}

interface CategoryAPI {
  id: number;
  slug: string;
  name: string;
}

interface NewsAPI {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: { news_image?: string };
}

export default function PortfolioTabs() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Выбранные индексы для категорий и табов
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Проверка мобильного для рендера всех табов сразу
  const [isMobile, setIsMobile] = useState(false);

  // Функция форматирования даты (если нужно)
  // const formatDate = (dateString?: string): string => {
  //   if (!dateString) return "";

  //   const [month, year] = dateString.split("/");

  //   if (!month || !year) return dateString;

  //   const date = new Date(parseInt(year), parseInt(month) - 1);

  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //   });
  // };

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 1150);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Загрузка категорий с табами (новостями)
  // useEffect(() => {
  //   async function fetchCategoriesWithTabs() {
  //     try {
  //       const categoriesRes = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/news-category');
  //       const categoriesData = await categoriesRes.json();

  //       const categoriesWithTabs = await Promise.all(
  //         categoriesData.map(async (cat: CategoryAPI) => {
  //           const tabsRes = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?news-category=${cat.id}`);
  //           const tabsData: NewsAPI[] = await tabsRes.json();

  //           return {
  //             id: cat.id,
  //             slug: cat.slug,
  //             title: cat.name,
  //             tabs: tabsData.map(tab => ({
  //               id: tab.id,
  //               slug: tab.slug,
  //               title: { rendered: tab.title.rendered },
  //               acf: {
  //                 news_image: tab.acf?.news_image || null,
  //               },
  //             })),
  //           };
  //         })
  //       );


  //       setCategories(categoriesWithTabs);
  //       setLoading(false);
  //     } catch (e) {
  //       console.error("Error loading categories and tabs", e);
  //       setLoading(false);
  //     }
  //   }

  //   fetchCategoriesWithTabs();
  // }, []);
  useEffect(() => {
    async function fetchCategoriesWithTabs() {
      try {
        const categoriesRes = await fetch(
          "http://tivaco.borodadigital.com/wp-json/wp/v2/news-category"
        );
        const categoriesData = await categoriesRes.json();

        // Если API вернул не массив — подстраховка
        if (!Array.isArray(categoriesData)) {
          console.error("Unexpected categories response", categoriesData);
          setCategories([]);
          setLoading(false);
          return;
        }

        const categoriesWithTabs = await Promise.all(
          categoriesData.map(async (cat: CategoryAPI) => {
            try {
              const tabsRes = await fetch(
                `http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?news-category=${cat.id}`
              );
              const tabsData = await tabsRes.json();

              // Если tabsData не массив, значит пришла ошибка API — подстраховка
              const safeTabs = Array.isArray(tabsData) ? tabsData : [];

              return {
                id: cat.id,
                slug: cat.slug,
                title: cat.name,
                tabs: safeTabs.map((tab: NewsAPI) => ({
                  id: tab.id,
                  slug: tab.slug,
                  title: { rendered: tab.title.rendered },
                  acf: {
                    news_image: tab.acf?.news_image || null,
                  },
                })),
              };
            } catch (err) {
              console.error(`Error loading tabs for category ${cat.id}`, err);
              return {
                id: cat.id,
                slug: cat.slug,
                title: cat.name,
                tabs: [],
              };
            }
          })
        );

        setCategories(categoriesWithTabs);
        setLoading(false);
      } catch (e) {
        console.error("Error loading categories and tabs", e);
        setCategories([]);
        setLoading(false);
      }
    }

    fetchCategoriesWithTabs();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (!categories.length) return <div>No categories found</div>;

  const activeCategory = categories[activeCategoryIndex];
  const tabs = activeCategory.tabs;

  const renderTabContent = (tab: Tab) => (
    <div key={tab.id} className="news-tabs__content" style={{ marginBottom: "20px" }}>
      <Link href={`/news-articles/${tab.slug}`}>
        <h3 className="mobile-title" dangerouslySetInnerHTML={{ __html: tab.title.rendered }} />
      </Link>


      {tab.acf?.news_image && (
        <div className="news-tabs__image" style={{ marginBottom: "10px" }}>
          <Image src={tab.acf.news_image} width={451} height={551} alt={tab.title.rendered} />
        </div>
      )}
      <Link className="news-detail" href={`/news-articles/${tab.slug}`}>
        <span>
          read the article
        </span>
        <Image src={'/more-arr.svg'} width={34} height={34} alt="img" />
      </Link>
    </div>
  );

  return (
    <div className="news-tabs">
      {/* Навигация по категориям */}
      <div className="news-tabs__categories" style={{ marginBottom: "20px" }}>
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className={`news-tabs__category-button ${i === activeCategoryIndex ? "active" : ""}`}
            onClick={() => {
              setActiveCategoryIndex(i);
              setActiveTabIndex(0); // Сброс таба при смене категории
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>
      <div className="news-tabs__inner">
        {/* Навигация по табам внутри категории (только если не мобилка) */}
        {!isMobile && tabs.length > 0 && (
          <div className="news-tabs__nav" style={{ marginBottom: "20px" }}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`news-tabs__button ${activeTabIndex === index ? "active" : ""}`}
                onClick={() => setActiveTabIndex(index)}
                dangerouslySetInnerHTML={{ __html: tab.title.rendered }}
              />
            ))}
          </div>
        )}

        {/* Контент табов */}
        {isMobile
          ? tabs.map(tab => renderTabContent(tab))
          : tabs.length > 0
            ? renderTabContent(tabs[activeTabIndex])
            : <div>No news in this category</div>}
      </div>
    </div>
  );
}
