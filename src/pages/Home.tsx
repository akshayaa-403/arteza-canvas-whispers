
import ParallaxHero from "@/components/ParallaxHero";
import FloatingArt from "@/components/FloatingArt";
import FeaturedCollectionsCarousel from "@/components/FeaturedCollectionsCarousel";
import BioSection from "@/components/BioSection";
import ProcessSteps from "@/components/ProcessSteps";
import TestimonialsSection from "@/components/TestimonialsSection";
import EmailSubscription from "@/components/EmailSubscription";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-cream/20 relative overflow-x-hidden">
      <FloatingArt />
      <ParallaxHero />
      <div className="relative z-20">
        {/* Collection Highlights */}
        <FeaturedCollectionsCarousel />
        {/* Quiz CTA */}
        <section className="max-w-5xl mx-auto my-12 px-4">
          <div className="bg-white/90 rounded-2xl shadow-lg py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-arteza-charcoal mb-1">Find Your Art Vibe</h3>
              <p className="text-muted-foreground">Take a 1-minute quiz to discover your perfect collection: Dreamscapes, Abstract Expressions, Cultural Chronicles, or Nature's Palette.</p>
            </div>
            <a href="/quiz" className="inline-flex items-center rounded-full bg-arteza-terracotta text-white px-6 py-3 hover:bg-arteza-rust transition-colors">Start Quiz</a>
          </div>
        </section>
        {/* Bio */}
        <BioSection />
        {/* Brush divider */}
        <div className="w-full flex justify-center my-8">
          <svg width="108" height="13" viewBox="0 0 108 13" fill="none">
            <path d="M1 12C25.5018 7.17628 94.0473 7.27269 107 8" stroke="#E4A373" strokeWidth="3" strokeLinecap="round" style={{filter: "blur(0.18px)"}} />
          </svg>
        </div>
        {/* Process */}
        <ProcessSteps />
        {/* Testimonials */}
        <TestimonialsSection />
        {/* Newsletter */}
        <section className="max-w-2xl mx-auto my-16 px-4">
          <div className="bg-white/90 rounded-2xl shadow-lg py-10 px-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-2">
                Stay Inspired
              </h2>
              <p className="text-muted-foreground">
                Be the first to know about new originals, collection drops, and exclusive updates from Upasna’s studio.
              </p>
            </div>
            <EmailSubscription />
          </div>
        </section>
        {/* Quote */}
        <section className="py-12 px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-arteza-charcoal max-w-3xl mx-auto mb-4 animate-fade-in">
            &quot;Every brushstroke is a heartbeat, every color a whispered secret.&quot;
          </blockquote>
          <p className="text-lg text-arteza-terracotta font-medium">— Upasna</p>
        </section>
      </div>
      {/* Footer */}
      <footer className="py-12 px-4 bg-arteza-charcoal text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">ARTEZA</h3>
          <p className="text-lg mb-6 opacity-80">
            Artist based in Noida. Shipping across India.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://instagram.com/arteza_upasna" className="hover:text-arteza-blush transition-colors">
              Instagram
            </a>
            <a href="https://wa.me/+91XXXXXXXXXX" className="hover:text-arteza-blush transition-colors">
              WhatsApp
            </a>
            <a href="/contact" className="hover:text-arteza-blush transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm opacity-60">
            © 2024 ARTEZA. All rights reserved. Made with ♡ in Noida.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Home;
