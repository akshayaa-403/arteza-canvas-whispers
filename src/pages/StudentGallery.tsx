
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const StudentGallery = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const studentArtworks = [
    {
      id: 1,
      title: "Evening Serenity",
      student: "Priya Sharma",
      age: "16 years",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      technique: "Watercolor",
      year: "2024"
    },
    {
      id: 2,
      title: "Urban Dreams",
      student: "Arjun Patel",
      age: "14 years",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      technique: "Acrylic",
      year: "2024"
    },
    {
      id: 3,
      title: "Nature's Dance",
      student: "Ananya Verma",
      age: "17 years",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      technique: "Oil Pastels",
      year: "2024"
    },
    {
      id: 4,
      title: "Monsoon Melody",
      student: "Rohan Singh",
      age: "15 years",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      technique: "Mixed Media",
      year: "2023"
    },
    {
      id: 5,
      title: "Golden Memories",
      student: "Kavya Reddy",
      age: "13 years",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      technique: "Watercolor",
      year: "2024"
    },
    {
      id: 6,
      title: "City Lights",
      student: "Aditya Kumar",
      age: "16 years",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      technique: "Acrylic",
      year: "2023"
    },
    {
      id: 7,
      title: "Floral Symphony",
      student: "Rhea Gupta",
      age: "14 years",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      technique: "Watercolor",
      year: "2024"
    },
    {
      id: 8,
      title: "Mountain Whispers",
      student: "Vikram Joshi",
      age: "17 years",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      technique: "Oil on Canvas",
      year: "2023"
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-6">
          Student Gallery
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Witness the blossoming of young artistic souls. Each piece here represents 
          a journey of discovery, creativity, and the joy of learning to see the world 
          through an artist's eyes.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {studentArtworks.map((artwork, index) => (
            <Card 
              key={artwork.id}
              className="group cursor-pointer border-arteza-blush hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(artwork.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Year Badge */}
                <Badge className="absolute top-3 right-3 bg-arteza-indigo text-white">
                  {artwork.year}
                </Badge>

                {/* Hover Overlay with Details */}
                <div className={`absolute bottom-4 left-4 right-4 text-white transform transition-all duration-300 ${
                  hoveredCard === artwork.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <h3 className="text-lg font-serif font-semibold mb-1">{artwork.title}</h3>
                  <p className="text-sm mb-1">by {artwork.student}</p>
                  <p className="text-xs opacity-90">{artwork.age} • {artwork.technique}</p>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-serif font-semibold text-arteza-charcoal group-hover:text-arteza-indigo transition-colors line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">by {artwork.student}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-arteza-peach text-arteza-charcoal text-xs">
                    {artwork.technique}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{artwork.age}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <Card className="bg-arteza-blush/30 border-arteza-blush text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-4">
              Want to Learn?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join our art classes and discover your own creative voice. 
              From beginners to advanced students, every artist finds their unique path here.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
            >
              <Link to="/contact">Inquire About Classes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Teaching Philosophy */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 watercolor-fade opacity-20 rounded-lg" />
          <blockquote className="relative text-xl md:text-2xl font-serif italic text-arteza-charcoal leading-relaxed mb-6">
            "Teaching art is not about creating replicas of my style, 
            but about helping each student discover their own unique voice 
            and the courage to express it."
          </blockquote>
          <p className="text-lg text-arteza-indigo font-medium">— Upasna, Art Instructor</p>
        </div>
      </div>
    </div>
  );
};

export default StudentGallery;
