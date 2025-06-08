
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const CollectorsWall = () => {
  const testimonials = [
    {
      id: 1,
      name: "Meera K.",
      location: "Mumbai",
      artwork: "Morning Whispers",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      quote: "This piece brings such serenity to my living room. Every morning, I sit with my tea and lose myself in its gentle beauty.",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Rajesh S.",
      location: "Delhi",
      artwork: "Cultural Chronicle #3",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      quote: "As someone who moved abroad years ago, this painting reconnects me with my roots every day. It's like having a piece of home.",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Priya M.",
      location: "Bangalore",
      artwork: "Abstract Expression #7",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      quote: "The energy in this piece is incredible. It transforms the entire mood of our office space. Colleagues always stop to admire it.",
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "Amit R.",
      location: "Pune",
      artwork: "Dreamscape #2",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      quote: "Bought this for my daughter's room. She says it helps her dream better. The colors are so soothing and magical.",
      rating: 5,
      verified: true
    },
    {
      id: 5,
      name: "Sunita J.",
      location: "Chennai",
      artwork: "Intimate Moment #5",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      quote: "This artwork speaks to my soul. It captures exactly how I feel during my quiet evening meditations. Simply beautiful.",
      rating: 5,
      verified: true
    },
    {
      id: 6,
      name: "Vikram T.",
      location: "Hyderabad",
      artwork: "Golden Hour",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      quote: "The quality and craftsmanship are exceptional. You can feel the artist's passion in every brushstroke. Worth every rupee.",
      rating: 5,
      verified: true
    }
  ];

  const collectorPhotos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      collector: "Anonymous",
      location: "Living Room"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      collector: "S.K.",
      location: "Home Office"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      collector: "M.P.",
      location: "Bedroom"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      collector: "R.S.",
      location: "Study Room"
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-6">
          Collector's Wall
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          See how ARTEZA pieces transform homes and touch hearts across India. 
          These are real stories from real collectors who've found their perfect piece.
        </p>
      </div>

      {/* Trust Stats */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-serif font-bold text-arteza-indigo mb-2">150+</h3>
            <p className="text-muted-foreground">Happy Collectors</p>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-arteza-indigo mb-2">12+</h3>
            <p className="text-muted-foreground">Cities Reached</p>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-arteza-indigo mb-2">4.9★</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-arteza-indigo mb-2">100%</h3>
            <p className="text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal text-center mb-12">
          What Collectors Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="border-arteza-blush hover:shadow-lg transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.artwork}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {testimonial.verified && (
                    <Badge className="bg-green-500 text-white">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-arteza-blush pt-4">
                  <p className="font-medium text-arteza-charcoal">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-arteza-indigo mt-1">Owns: {testimonial.artwork}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Collector Photos Collage */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal text-center mb-12">
          Art in Their Homes
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collectorPhotos.map((photo, index) => (
            <Card 
              key={photo.id}
              className="group cursor-pointer border-arteza-blush hover:shadow-lg transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.image}
                  alt={`Collector ${photo.collector}'s ${photo.location}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{photo.collector}</p>
                  <p className="text-xs">{photo.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Quote */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 watercolor-fade opacity-20 rounded-lg" />
          <blockquote className="relative text-2xl md:text-3xl font-serif italic text-arteza-charcoal leading-relaxed mb-6">
            "Art is not what you see, but what you make others see. 
            These pieces don't just decorate walls—they transform spaces into sanctuaries."
          </blockquote>
          <p className="text-lg text-arteza-indigo font-medium">— A Collector's Reflection</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-arteza-blush/30 border-arteza-blush text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-4">
              Ready to Start Your Collection?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join our community of art lovers and find the piece that speaks to your soul.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
              >
                <Link to="/shop">Browse Collection</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush transition-all duration-300"
              >
                <Link to="/commission">Commission Art</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorsWall;
