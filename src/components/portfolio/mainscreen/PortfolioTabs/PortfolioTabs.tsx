"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Tab {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    portfolio_short_description?: string;
    portfolio_date?: string;
  };
}

interface PortfolioTabsProps {
  tabs: Tab[];
}

export default function PortfolioTabs({ tabs }: PortfolioTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";

    const [month, year] = dateString.split("/");

    if (!month || !year) return dateString;

    // Преобразуем в дату для получения названия месяца
    const date = new Date(parseInt(year), parseInt(month) - 1);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 1150);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!tabs.length) return null;

  const renderTabContent = (tab: Tab) => (
    <div key={tab.id} className="portfolio-tabs__content">
      <h3 dangerouslySetInnerHTML={{ __html: tab.title.rendered }} />
      {tab.acf?.portfolio_short_description && (
        <div className="portfolio-tabs__description">
          <p>{tab.acf.portfolio_short_description}</p>
        </div>
      )}
      {tab.acf?.portfolio_date && (
        <div className="portfolio-tabs__date">{formatDate(tab.acf.portfolio_date)}</div>
      )}
      <Link className="portfolio-detail" href={`/portfolio/${tab.slug}`}>
        Read more
      </Link>
    </div>
  );




  return (
    <div className="portfolio-tabs">
      {!isMobile && (
        <div className="portfolio-tabs__nav">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`portfolio-tabs__button ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              dangerouslySetInnerHTML={{ __html: tab.title.rendered }}
            />
          ))}
        </div>
      )}

      {isMobile
        ? tabs.map(tab => renderTabContent(tab))
        : renderTabContent(tabs[activeIndex])}
    </div>
  );
}
