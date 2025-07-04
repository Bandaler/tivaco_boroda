import SliderTeam from "./SliderTeam/SliderTeam";
import './style.css'

export default async function TeamHomepage() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/team-list?_embed', {
    cache: 'no-store',
  });

  const teamList = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <SliderTeam teamList={teamList} />

      </div>
    </>
  );
}
