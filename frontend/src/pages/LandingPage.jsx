import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Market from "../components/landing/Market";
import AIAssistant from "../components/landing/AIAssistant";
import Footer from "../components/landing/Footer";

export default function LandingPage() {

  return (
    <div>

      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="market">
        <Market />
      </section>

      <section id="aiassistant">
        <AIAssistant />
      </section>

      <Footer />

    </div>
  );
}