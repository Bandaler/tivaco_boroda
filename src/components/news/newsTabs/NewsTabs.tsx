"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Tab {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: { news_image?: string | null };
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
  count: number;
}

interface NewsAPI {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: { news_image?: string };
}

export default function NewsTabs() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 1150);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const API_URL_CATS = process.env.NEXT_PUBLIC_API_SECRET_URL_NEWS_CATS!;
    const API_URL_NEWS = process.env.NEXT_PUBLIC_API_SECRET_URL_NEWS!;

    console.log("API_URL_CATS:", API_URL_CATS);
    console.log("API_URL_NEWS:", API_URL_NEWS);

    if (!API_URL_CATS || !API_URL_NEWS) {
      console.error("API URLs are not defined in environment variables");
      setLoading(false);
      return;
    }

    async function fetchCategoriesWithTabs() {
      try {
        const categoriesRes = await fetch(API_URL_CATS);
        const categoriesData: CategoryAPI[] = await categoriesRes.json();
        console.log("Fetched categories:", categoriesData);

        if (!Array.isArray(categoriesData)) {
          console.error("Unexpected categories response", categoriesData);
          setCategories([]);
          setLoading(false);
          return;
        }

        const categoriesWithTabs: Category[] = [];

        for (const cat of categoriesData) {
          // Пропускаем категории без постов сразу
          if (cat.count === 0) continue;

          try {
            const tabsRes = await fetch(`${API_URL_NEWS}?news-category=${cat.id}`);
            const tabsData: NewsAPI[] = await tabsRes.json();
            console.log(`Fetched news for category ${cat.name} (${cat.id}):`, tabsData);

            if (!Array.isArray(tabsData) || tabsData.length === 0) continue;

            const tabs: Tab[] = tabsData.map((tab) => ({
              id: tab.id,
              slug: tab.slug,
              title: { rendered: tab.title.rendered },
              acf: { news_image: tab.acf?.news_image || null },
            }));

            categoriesWithTabs.push({
              id: cat.id,
              slug: cat.slug,
              title: cat.name,
              tabs,
            });
          } catch (err) {
            console.error(`Error loading news for category ${cat.id}`, err);
          }
        }

        setCategories(categoriesWithTabs);
        setLoading(false);
      } catch (e) {
        console.error("Error loading categories", e);
        setCategories([]);
        setLoading(false);
      }
    }

    fetchCategoriesWithTabs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!categories.length) return <div>No categories with news found</div>;

  const activeCategory = categories[activeCategoryIndex];
  const tabs = activeCategory.tabs;

  const renderTabContent = (tab: Tab) => (
    <div key={tab.id} className="news-tabs__content" style={{ marginBottom: "20px" }}>
      <Link href={`/news-articles/${tab.slug}`}>
        <h3 className="mobile-title" dangerouslySetInnerHTML={{ __html: tab.title.rendered }} />
      </Link>

      {tab.acf?.news_image ? (
        <div className="news-tabs__image" style={{ marginBottom: "10px" }}>
          <Image src={tab.acf.news_image} width={451} height={551} alt={tab.title.rendered} />
        </div>
      ) : (
        <div
          className="news-tabs__image"
          style={{
            marginBottom: "10px",
            background: "#eee",
            width: 451,
            height: 551,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No image
        </div>
      )}

      <Link className="news-detail" href={`/news-articles/${tab.slug}`}>
        <span>read the article</span>
        <Image src="/more-arr.svg" width={34} height={34} alt="img" />
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
              setActiveTabIndex(0); // сброс активного таба
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="news-tabs__inner">
        {/* Навигация по табам для десктопа */}
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
        {tabs.length > 0 ? (
          isMobile ? (
            tabs.map(renderTabContent)
          ) : (
            renderTabContent(tabs[activeTabIndex])
          )
        ) : (
          <div>No news in this category</div>
        )}
      </div>
    </div>
  );
}
