import SliderTeam from '@/components/homepage/team/SliderTeam/SliderTeam';
// import './style.css'

export default async function TeamHomepage() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/team-list?_embed', { cache: 'force-cache' });

  const teamList = await res.json();

  return (
    <>
      <div className="main-bg sec-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="container team-container">
        <SliderTeam teamList={teamList} />

        </div>

      </div>
    </>
  );
}
