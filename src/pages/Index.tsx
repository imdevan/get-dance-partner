import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AppPreview from "@/components/AppPreview";
import DanceStyles from "@/components/DanceStyles";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <AppPreview />
      <DanceStyles />
      {/* <Testimonials /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
