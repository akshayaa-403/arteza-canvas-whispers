
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const About = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 watercolor-fade"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-arteza-charcoal mb-6 animate-watercolor-float">
            Meet Upasna
          </h1>
          <p className="text-xl md:text-2xl font-light text-arteza-indigo leading-relaxed">
            An introspective journey through art, where every brushstroke 
            carries the weight of emotion and the whisper of cultural stories.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="sketch-border p-8 bg-arteza-blush/20 rounded-lg">
              <h2 className="text-3xl font-serif font-bold text-arteza-charcoal mb-4">
                The Artist's Heart
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Based in the vibrant city of Noida, I find myself constantly drawn to the 
                intersection of tradition and modernity, of silence and expression. My art 
                is born from those quiet moments when emotions overflow and seek refuge 
                on canvas.
              </p>
            </div>
            
            <div className="sketch-border p-8 bg-arteza-peach/20 rounded-lg">
              <h3 className="text-2xl font-serif font-semibold text-arteza-charcoal mb-3">
                A Personal Philosophy
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I believe that art should feel like a conversation between souls. Each piece 
                I create is an invitation to pause, to feel, to remember that beauty exists 
                in both our struggles and our joys.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="Artist at work"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-arteza-blush rounded-full opacity-60 animate-gentle-float" />
          </div>
        </div>
      </section>

      {/* Animated Quote */}
      <section className="py-20 px-4 bg-arteza-ivory/50">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic text-arteza-charcoal leading-relaxed mb-8 animate-brush-stroke">
            "I paint not what I see, but what I feel. 
            Each canvas becomes a mirror of the heart's landscape."
          </blockquote>
          <div className="w-24 h-1 bg-arteza-indigo mx-auto rounded-full animate-brush-stroke" />
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-arteza-charcoal text-center mb-16">
          The Artistic Journey
        </h2>
        
        <div className="space-y-12">
          <Card className="border-arteza-blush hover:shadow-lg transition-all duration-500">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-serif font-semibold text-arteza-charcoal mb-4">
                    Early Inspirations
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Growing up surrounded by the rich tapestry of Indian culture, I was 
                    constantly inspired by the colors of festivals, the patterns of traditional 
                    textiles, and the stories passed down through generations. These early 
                    influences continue to weave through my work today.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-arteza-blush rounded-full flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-arteza-charcoal">2010</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-arteza-peach hover:shadow-lg transition-all duration-500">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center md:order-first">
                  <div className="w-32 h-32 bg-arteza-peach rounded-full flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-arteza-charcoal">2018</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-serif font-semibold text-arteza-charcoal mb-4">
                    Finding My Voice
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    The transition to abstract expression marked a turning point in my artistic 
                    journey. I discovered that emotion could be conveyed through color and form 
                    in ways that representational art couldn't capture. This freedom transformed 
                    my relationship with the canvas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-arteza-olive hover:shadow-lg transition-all duration-500">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-serif font-semibold text-arteza-charcoal mb-4">
                    ARTEZA is Born
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    In 2022, ARTEZA emerged as more than just a brand—it became a philosophy. 
                    The name represents the fusion of 'Art' and 'Raza' (essence), embodying 
                    my belief that true art captures the essence of human experience and 
                    cultural heritage.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-arteza-olive rounded-full flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-arteza-charcoal">2022</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-arteza-blush/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-arteza-charcoal text-center mb-16">
            The Creative Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-arteza-blush hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-arteza-indigo rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-3">
                  Contemplation
                </h3>
                <p className="text-muted-foreground">
                  Every piece begins with a moment of quiet reflection, allowing emotions 
                  and memories to surface and find their voice.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-arteza-peach hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-arteza-charcoal rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-3">
                  Expression
                </h3>
                <p className="text-muted-foreground">
                  Through bold brushstrokes and intuitive color choices, the raw emotion 
                  transforms into visual poetry on canvas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-arteza-olive hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-arteza-olive rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-3">
                  Connection
                </h3>
                <p className="text-muted-foreground">
                  The finished piece seeks its home with someone who will feel its story 
                  and carry its essence into their own space.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-6">
            Let's Create Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're drawn to a specific piece or would like to commission something 
            unique, I'd love to hear from you. Every conversation is an opportunity to 
            connect and create something meaningful.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
            >
              <Link to="/contact">Start a Conversation</Link>
            </Button>
            <Button 
              variant="outline"
              asChild
              size="lg"
              className="border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush transition-all duration-300"
            >
              <Link to="/shop">Explore My Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
