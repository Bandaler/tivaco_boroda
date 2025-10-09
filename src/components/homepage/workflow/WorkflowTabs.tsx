'use client';

type Tab = {
  hm_workflow_tabs_title: string;
  hm_workflow_description: string;
};

export default function WorkflowTabs({ tabs }: { tabs: Tab[] }) {
  if (!tabs?.length) return null;

  return (
    <div className="workflow-tabs">
      {tabs.map((tab, index) => (
        <div key={index} className="workflow-tab-item">
          <h3 className="workflow-tab-title">{tab.hm_workflow_tabs_title}</h3>
          <div className="workflow-tab-description">
            {tab.hm_workflow_description}
          </div>
        </div>
      ))}
    </div>
  );
}

