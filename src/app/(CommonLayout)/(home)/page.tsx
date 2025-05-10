import FeaturedSection from "@/components/modules/home/FeaturedSection/FeaturedSection";
import HeroSection from "@/components/modules/home/HeroSection";
import NewArrival from "@/components/modules/home/NewArrival/NewArrival";
import NewsletterForm from "@/components/modules/home/NewsLetter/NewsLetterForm";
import TestimonialSection from "@/components/modules/home/Testimonials/TestimonialSections";

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-gradient-to-b from-white via-[#f9f9ff] to-white overflow-x-hidden space-y-6">
        <HeroSection />
        <NewArrival/>
        <FeaturedSection/>
        <NewsletterForm/>
        <TestimonialSection/> 
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
