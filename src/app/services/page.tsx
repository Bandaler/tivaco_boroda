

export default async function Services() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/26', { cache: 'no-store' });
  const page = await res.json();

  return (
    <>
      <div className="main-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="title">{page.acf?.hm_title}</div>
        <div className="description">{page.acf?.hm_description}</div>
      </div>
        
    </>
  );
}
