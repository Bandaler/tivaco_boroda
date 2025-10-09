'use client';

import { useState } from 'react';

type Tab = {
  hm_workflow_tabs_title: string;
  hm_workflow_description: string;
};

export default function WorkflowTabs({ tabs }: { tabs: Tab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs.length) return null;

  return (
    <div className="workflow-tabs">
      <div className="workflow-tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`workflow-tab-btn ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.hm_workflow_tabs_title}
          </button>
        ))}
      </div>

      <div className="workflow-tab-content">
        {tabs[activeIndex].hm_workflow_description}
      </div>
    </div>
  );
}
