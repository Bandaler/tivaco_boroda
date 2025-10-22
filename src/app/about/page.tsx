import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Tivaco",
  description: "page about",
};

export default async function About() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PAGES;
  const res = await fetch(`${API_URL}/24`, { cache: 'force-cache' });
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
