

export default async function Team() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/20', { cache: 'no-store' });
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
