import he from 'he';
import Link from 'next/link';
import Image from 'next/image';
import NavMenu from './NavMenu';

export default async function Header() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/custom/v1/menu/menu-header');
  const menu = await res.json();

  return (
    <header>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            {/* <Link className="logo" href="/">
              <Image src="/logo.svg" width={1000} height={1000} alt="logo" />
            </Link> */}

            <NavMenu menu={menu.map((item:MenuItem) => ({
              ...item,
              title: he.decode(item.title)
            }))} />

            {/* <div className="nav-right">
              <button className="header-btn">AI assistant</button>
              <button className="lang-switcher">
                <span>ENG</span>
              </button>
            </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
