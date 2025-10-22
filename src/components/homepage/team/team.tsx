import MotionSection from "@/hooks/MotionSection";
import SliderTeam from "./SliderTeam/SliderTeam";
import './style.css'

export default async function TeamHomepage() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_TEAM;
  const res = await fetch(`${API_URL}?_embed`, { cache: 'force-cache' });

  const teamList = await res.json();

  return (
    <>
      <div className="main-bg sec-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="container team-container">
          <MotionSection animation="zoom-out">
            <SliderTeam teamList={teamList} />
          </MotionSection>


        </div>

      </div>
    </>
  );
}
