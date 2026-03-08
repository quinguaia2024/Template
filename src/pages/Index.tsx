import CursorFollower from "@/components/landing/CursorFollower";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import VideoSection from "@/components/landing/VideoSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ImpactSection from "@/components/landing/ImpactSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <VideoSection />
      <HowItWorksSection />
      <ImpactSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
