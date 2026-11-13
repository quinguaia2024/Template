import EduCompanion from "@/components/landing/EduCompanion";
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
import SectionDivider from "@/components/landing/SectionDivider";

const Index = () => {
  return (
    <div className="landing-page min-h-screen bg-background">
      <CursorFollower />
      <Navbar />
      <HeroSection />
      <SectionDivider variant="wave" />
      <ProblemSection />
      <SectionDivider variant="pulse" />
      <SolutionSection />
      <SectionDivider variant="orbit" />
      <VideoSection />
      <SectionDivider variant="glitch" />
      <HowItWorksSection />
      <SectionDivider variant="wave" />
      <ImpactSection />
      <SectionDivider variant="pulse" />
      <CTASection />
      <Footer />
      <EduCompanion />
    </div>
  );
};

export default Index;
