'use client';

import MotionSection from '@/hooks/MotionSection';
import { useState } from 'react';

interface Tab {
  title: string;
  content: string;
}

export default function Tabs({
  tabs,
  themeColor,
}: {
  tabs: Tab[];
  themeColor?: string; // например: 'Светлая' или 'Тёмная'
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isLight = themeColor === 'Светлая';

  const textColor = isLight ? '#2C248E' : '#B6B2F0';
  const textColorBtn = isLight ? '#B6B2F0' : '#2C248E';

  return (
    <div className={`tabs-services ${isLight ? 'light' : 'dark'}`}>
      <MotionSection animation="fade-left">
        <div className="tab-links">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                className={`tab-link ${isActive ? 'active' : ''} ${isActive && isLight ? 'light-active' : ''
                  }`}
                onClick={() => setActiveIndex(index)}
                style={{ color: textColorBtn }}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </MotionSection>
      <MotionSection animation="fade-right">
        <div className="tab-content">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`tab-content__item ${isActive ? 'active' : 'hidden'}`}
                dangerouslySetInnerHTML={{ __html: tab.content }}
                style={{ color: textColor }}
              />
            );
          })}
        </div>
      </MotionSection>
    </div>
  );
}
