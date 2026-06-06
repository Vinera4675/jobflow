import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HomeCallToAction } from "@/components/HomeCallToAction";
import { HowItWorks } from "@/components/HowItWorks";
import { UserTypeCards } from "@/components/UserTypeCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <UserTypeCards />
        <HomeCallToAction />
      </main>
      <Footer />
    </div>
  );
}
