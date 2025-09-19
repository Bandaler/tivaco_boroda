// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <main className="scroll-container">
        <section className="section light">
          <div className="main-bg light"></div>
          <div className="secondary-bg light-bg"></div>
          <div className="arrow arrow-nf">
            <Image src={'/arrow.png'} width={1000} height={1000} alt="image" />
          </div>
          <div className="page-content nf-content">
            <div className="w-bg">
              <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
            </div>
            <div className="container">
              <div className="nf-inner">
                <h1>404</h1>
                <p>
                  Ooops!
                  This page is still in post-production.
                </p>
                <Link className="nf-back" href="/">
                  back to main
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>

  );
}
