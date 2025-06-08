
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, []);

  const collections = [
    {
      name: "Dreamscapes",
      description: "Ethereal visions painted in whispers",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      count: "12 pieces"
    },
    {
      name: "Abstract Expressions",
      description: "Raw emotion through bold brushstrokes",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      count: "8 pieces"
    },
    {
      name: "Cultural Chronicles",
      description: "Stories from the heart of India",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      count: "15 pieces"
    },
    {
      name: "Intimate Moments",
      description: "Quiet observations of daily poetry",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      count: "6 pieces"
    }
  ];

  const featuredArtworks = [
    {
      title: "Morning Musings",
      price: "₹8,500",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      title: "Sunset Solitude",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    {
      title: "Urban Dreams",
      price: "₹15,500",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center watercolor-fade overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-arteza-charcoal mb-6 animate-watercolor-float">
            Art That Feels
          </h1>
          <p className="text-xl md:text-2xl font-light text-arteza-indigo mb-8 max-w-2xl mx-auto leading-relaxed">
            Step into a world where brushstrokes whisper stories, and every canvas holds a piece of the soul. 
            Welcome to the intimate universe of Upasna's artistry.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-arteza-blush text-arteza-charcoal hover:bg-arteza-peach transition-all duration-300 px-8 py-3 text-lg font-medium hover-brush-stroke"
            >
              <Link to="/shop">Explore Collections</Link>
            </Button>
            <Button 
              variant="outline"
              asChild
              size="lg"
              className="border-arteza-indigo text-arteza-indigo hover:bg-arteza-indigo hover:text-white transition-all duration-300 px-8 py-3 text-lg"
            >
              <Link to="/about">Meet the Artist</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-arteza-indigo" />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-4">
            Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each collection tells a different story, painted with intention and heart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <Card 
              key={collection.name}
              className="group cursor-pointer border-arteza-blush hover:shadow-lg transition-all duration-500 hover:scale-105 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-3 right-3 bg-arteza-blush text-arteza-charcoal">
                  {collection.count}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2 text-arteza-charcoal group-hover:text-arteza-indigo transition-colors">
                  {collection.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {collection.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <section ref={galleryRef} className="py-20 bg-arteza-blush/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-8 text-center">
            Featured Artworks
          </h2>
          
          <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
            {featuredArtworks.map((artwork, index) => (
              <div
                key={artwork.title}
                className="flex-none w-80 group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-serif font-semibold mb-1">{artwork.title}</h3>
                    <p className="text-lg font-medium">{artwork.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Quote Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 watercolor-fade opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic text-arteza-charcoal leading-relaxed mb-8">
            "Every brushstroke is a heartbeat, every color a whispered secret, 
            every canvas a window into the soul's landscape."
          </blockquote>
          <p className="text-lg text-arteza-indigo font-medium">— Upasna</p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-arteza-peach/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be the first to see new artworks, read studio stories, and join the creative journey
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="border-arteza-blush focus:border-arteza-indigo"
            />
            <Button className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            No spam, just art and heart. Unsubscribe anytime.
          </p>
        </div>
      </section>

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
            <Link to="/contact" className="hover:text-arteza-blush transition-colors">
              Contact
            </Link>
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
