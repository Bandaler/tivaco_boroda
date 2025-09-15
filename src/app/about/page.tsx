

export default async function About() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/24', { cache: 'force-cache' });
  const page = await res.json();

  return (
    <div >
      <main >
        <div className="title">{page.acf?.hm_title}</div>
        <div className="description">{page.acf?.hm_description}</div>
      </main>
      <footer></footer>
    </div>
  );
}
