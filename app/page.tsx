import Background from "@/components/background/Background";
import Hero from "@/components/hero/Hero";
import MainLayout from "@/components/layout/MainLayout";
import Navbar from "@/components/layout/Navbar";
import Terminal from "@/components/terminal/Terminal";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Countdown from "@/components/countdown/Countdown";
import Newsletter from "@/components/newsletter/Newsletter";

export default function Home() {
  return (
    <MainLayout>
      <Background />
      <Navbar />
      <Hero />
      <Terminal />
      <Countdown />
      <Features />
      <Newsletter />
      <Footer />

    </MainLayout>
  );
}
