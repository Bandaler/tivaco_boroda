import Link from 'next/link';
import WorkflowTabs from './WorkflowTabs';

export default async function Workflow() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', {
    cache: 'no-store' // или 'force-cache', если хочешь кэшировать
  });
  const page = await res.json();

  const tabs = page.acf?.hm_workflow_tabs || [];
  const smallText = page.acf?.hm_workflow_small || '';
  const title = page.acf?.hm_workflow_title || '';

  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="workflow-block">
          <div className="container">
            <div className="workflow-block__inner">
              <div className="workflow-small">{smallText}</div>
              <div className="workflow-block__title">{title}</div>

              <WorkflowTabs tabs={tabs} />

              <Link className="blue-btn" href="#">request a consultation</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
