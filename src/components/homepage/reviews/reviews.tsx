import MotionSection from "@/hooks/MotionSection";
import ReviewsSlider from "./ReviewsSlider/ReviewsSlider"; 
import Image from "next/image";

type ReviewSlide = {
  slider_review_text: string;
  slider_review_author: string;
};

export default async function Reviews() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PAGES;
  const res = await fetch(`${API_URL}/9`, { cache: 'force-cache' });
  const page = await res.json();
  const reviewSlides: ReviewSlide[] = page.acf?.hm_slider_review || [];

  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        {/* <div className="w-bg">
          <Image src={'/w-bg.png'} width={4000} height={4000} alt="bg" />
        </div> */}
        <div className="mark-decor">
          <Image src={'/mark.svg'} width={4000} height={4000} alt="bg" />
        </div>
        <div className="container padding-0">
          <div className="reviews-block">
            <MotionSection animation="fade-up">
              <div className="reviews-block__small">
                {page.acf?.hm_slider_title_section_reviews_small}
              </div>
              <div className="reviews-block__title">
                {page.acf?.hm_slider_title_section_reviews}
              </div>
            </MotionSection>
            <MotionSection animation="fade-down">
              <div className="reviews-slider__block">
                <div className="reviews-slider__block-title">
                  {page.acf?.hm_slider_title_reviews}
                </div>

                <div className="reviews-slider">
                  <ReviewsSlider slides={reviewSlides} />
                </div>
              </div>
            </MotionSection>

          </div>
        </div>
      </div>
    </>
  );
}
