import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sparkles, Heart, ArrowRight, Play, Palette, Star, Users, TrendingUp } from "lucide-react";
import ParallaxHero from "@/components/ParallaxHero";
import FloatingArt from "@/components/FloatingArt";
import FeaturedCollectionsCarousel from "@/components/FeaturedCollectionsCarousel";
import BioSection from "@/components/BioSection";
import ProcessSteps from "@/components/ProcessSteps";
import TestimonialsSection from "@/components/TestimonialsSection";
import EmailSubscription from "@/components/EmailSubscription";

const Home = () => {
  const [currentTrend, setCurrentTrend] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const trendingTopics = [
    { icon: "✨", text: "Dreamy Art Vibes", color: "bg-purple-100 text-purple-600" },
    { icon: "🎨", text: "Abstract Feels", color: "bg-pink-100 text-pink-600" },
    { icon: "🌸", text: "Cultural Stories", color: "bg-orange-100 text-orange-600" },
    { icon: "🌿", text: "Nature Therapy", color: "bg-green-100 text-green-600" }
  ];

  const stats = [
    { number: "500+", label: "Happy Art Lovers", icon: Heart },
    { number: "50+", label: "Unique Pieces", icon: Palette },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "100+", label: "Art Classes Taught", icon: Users }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTrend((prev) => (prev + 1) % trendingTopics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [trendingTopics.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-cream/20 relative overflow-x-hidden">
      <FloatingArt />
      
      {/* Enhanced Hero Section */}
      <div className="relative">
        <ParallaxHero />
        
        {/* Trending Badge - Youth Appeal */}
        <div className="absolute top-4 right-4 z-30 animate-bounce">
          <Badge className={`${trendingTopics[currentTrend].color} border-0 text-sm font-medium px-3 py-1 transition-all duration-500`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {trendingTopics[currentTrend].icon} {trendingTopics[currentTrend].text}
          </Badge>
        </div>
      </div>

      <div className="relative z-20">
        {/* Quick Actions - Gen Z Style */}
        <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Take Quiz", desc: "Find Your Vibe", icon: Sparkles, path: "/quiz", color: "from-purple-400 to-pink-400" },
              { title: "Shop Art", desc: "Get That Piece", icon: Heart, path: "/shop", color: "from-orange-400 to-red-400" },
              { title: "Art Classes", desc: "Level Up Skills", icon: Palette, path: "/art-classes", color: "from-green-400 to-blue-400" },
              { title: "Blog", desc: "Read Stories", icon: Play, path: "/blog", color: "from-indigo-400 to-purple-400" }
            ].map((action, index) => (
              <Link key={action.title} to={action.path}>
                <Card className={`group hover:scale-105 transition-all duration-300 border-0 shadow-lg hover:shadow-xl bg-gradient-to-br ${action.color} text-white transform hover:-translate-y-1`}>
                  <CardContent className="p-4 text-center">
                    <action.icon className="w-6 h-6 mx-auto mb-2 group-hover:animate-pulse" />
                    <h3 className="font-bold text-sm">{action.title}</h3>
                    <p className="text-xs opacity-90">{action.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section - Social Proof */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-4 animate-fade-in">
              Join the Art Revolution ✨
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thousands of art lovers are already part of our creative community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-arteza-terracotta" />
                <div className="text-2xl md:text-3xl font-bold text-arteza-charcoal mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Collection Highlights with Modern Twist */}
        <section id="collections" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-4">
              Discover Your Art Aesthetic 🎨
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four unique collections, each with its own personality and story
            </p>
          </div>
          <FeaturedCollectionsCarousel />
        </section>

        {/* Interactive Quiz CTA */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <Card className="bg-gradient-to-r from-arteza-sage/20 to-arteza-cream/20 border-arteza-blush overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-arteza-terracotta/20 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-arteza-terracotta animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-4">
                  Not Sure Which Art Speaks to You?
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take our fun personality quiz and discover which of our four collections matches your vibe perfectly!
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["Dreamscapes", "Abstract Expressions", "Cultural Chronicles", "Nature's Palette"].map((collection) => (
                  <Badge key={collection} variant="outline" className="border-arteza-blush text-arteza-charcoal">
                    {collection}
                  </Badge>
                ))}
              </div>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust text-white hover:from-arteza-rust hover:to-arteza-terracotta transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link to="/quiz" className="inline-flex items-center">
                  Take the Quiz <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Bio Section */}
        <BioSection />
        
        {/* Brush divider */}
        <div className="w-full flex justify-center my-8">
          <svg width="108" height="13" viewBox="0 0 108 13" fill="none" className="animate-pulse">
            <path d="M1 12C25.5018 7.17628 94.0473 7.27269 107 8" stroke="#E4A373" strokeWidth="3" strokeLinecap="round" style={{filter: "blur(0.18px)"}} />
          </svg>
        </div>
        
        {/* Process Steps */}
        <ProcessSteps />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Modern Newsletter Section */}
        <section className="max-w-2xl mx-auto my-16 px-4">
          <Card className="bg-gradient-to-br from-white/90 to-arteza-cream/50 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust p-6 text-white text-center">
                <h2 className="text-2xl font-serif font-bold mb-2">
                  Stay in the Loop 📧
                </h2>
                <p className="opacity-90">
                  Get the latest drops, exclusive previews, and art inspo straight to your inbox
                </p>
              </div>
              <div className="p-6">
                <EmailSubscription />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Inspirational Quote */}
        <section className="py-12 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-arteza-charcoal mb-4 animate-fade-in">
              &quot;Every brushstroke is a heartbeat, every color a whispered secret.&quot;
            </blockquote>
            <p className="text-lg text-arteza-terracotta font-medium">— Upasna ✨</p>
          </div>
        </section>
      </div>
      
      {/* Enhanced Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-arteza-charcoal to-arteza-rust text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-bold mb-4 bg-gradient-to-r from-white to-arteza-cream bg-clip-text text-transparent">
              ARTEZA
            </h3>
            <p className="text-lg mb-6 opacity-80">
              Artist based in Noida. Shipping across India. 🇮🇳
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/shop" className="block hover:text-arteza-cream transition-colors">Shop Art</Link>
                <Link to="/quiz" className="block hover:text-arteza-cream transition-colors">Take Quiz</Link>
                <Link to="/art-classes" className="block hover:text-arteza-cream transition-colors">Art Classes</Link>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="space-y-2">
                <a href="https://instagram.com/arteza_upasna" className="block hover:text-arteza-cream transition-colors">
                  📸 Instagram
                </a>
                <a href="https://wa.me/+91XXXXXXXXXX" className="block hover:text-arteza-cream transition-colors">
                  💬 WhatsApp
                </a>
                <Link to="/contact" className="block hover:text-arteza-cream transition-colors">
                  ✉️ Contact
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-3">Collections</h4>
              <div className="space-y-2 text-sm">
                <p className="opacity-80">✨ Dreamscapes</p>
                <p className="opacity-80">🎨 Abstract Expressions</p>
                <p className="opacity-80">🏛️ Cultural Chronicles</p>
                <p className="opacity-80">🌿 Nature's Palette</p>
              </div>
            </div>
          </div>
          
          <div className="text-center border-t border-white/20 pt-6">
            <p className="text-sm opacity-60">
              © 2024 ARTEZA. All rights reserved. Made with ♡ in Noida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;