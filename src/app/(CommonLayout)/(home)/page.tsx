import FeaturedSection from "@/components/modules/home/FeaturedSection/FeaturedSection";
import HeroSection from "@/components/modules/home/HeroSection";
import NewsletterForm from "@/components/modules/home/NewsLetter/NewsLetterForm";
import TestimonialSection from "@/components/modules/home/Testimonials/TestimonialSections";

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-gradient-to-b from-white via-[#f9f9ff] to-white">
        <HeroSection />
        <FeaturedSection/>
        <NewsletterForm/>
        <TestimonialSection/> 
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
