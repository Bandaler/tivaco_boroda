import Link from 'next/link';
import WorkflowTabs from './WorkflowTabs';
import MotionSection from '@/hooks/MotionSection';

export default async function Workflow() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/9', { cache: 'force-cache' });
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
          <div className="container padding-0">
            <div className="workflow-block__inner">
              <MotionSection animation="fade-up">
                <div className="workflow-small">{smallText}</div>
                <div className="workflow-block__title">{title}</div>
              </MotionSection>
              <MotionSection animation="fade-left">
                <WorkflowTabs tabs={tabs} />

                <Link className="blue-btn" href="#consult">request a consultation</Link>
              </MotionSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
