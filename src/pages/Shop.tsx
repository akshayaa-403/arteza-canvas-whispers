
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { value: "all", label: "All Collections" },
    { value: "dreamscapes", label: "Dreamscapes" },
    { value: "abstract", label: "Abstract Expressions" },
    { value: "cultural", label: "Cultural Chronicles" },
    { value: "intimate", label: "Intimate Moments" }
  ];

  const artworks = [
    {
      id: 1,
      title: "Morning Whispers",
      category: "dreamscapes",
      price: 8500,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      size: "12x16 inches",
      medium: "Acrylic on Canvas",
      available: true
    },
    {
      id: 2,
      title: "Sunset Solitude",
      category: "abstract",
      price: 12000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      size: "16x20 inches",
      medium: "Oil on Canvas",
      available: true
    },
    {
      id: 3,
      title: "Heritage Dreams",
      category: "cultural",
      price: 15500,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      size: "18x24 inches",
      medium: "Mixed Media",
      available: false
    },
    {
      id: 4,
      title: "Quiet Reflections",
      category: "intimate",
      price: 6500,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      size: "10x14 inches",
      medium: "Watercolor",
      available: true
    },
    {
      id: 5,
      title: "Golden Hour",
      category: "dreamscapes",
      price: 9500,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      size: "14x18 inches",
      medium: "Acrylic on Canvas",
      available: true
    },
    {
      id: 6,
      title: "Urban Poetry",
      category: "abstract",
      price: 11000,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      size: "16x20 inches",
      medium: "Oil on Canvas",
      available: true
    }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === "all" || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Art Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece is an original creation, painted with love and intention. 
            Discover the artwork that speaks to your soul.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 border-primary/20 focus:border-primary text-foreground"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 border-primary/20 text-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <Card 
              key={artwork.id}
              className="group cursor-pointer border-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Availability Badge */}
                <Badge 
                  className={`absolute top-3 right-3 ${
                    artwork.available 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {artwork.available ? "Available" : "Sold"}
                </Badge>

                {/* Hover Actions - Only Quick View */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-white/90 text-gray-900 border-white hover:bg-white hover:text-gray-900"
                  >
                    Quick View
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-lg font-bold text-primary">
                    ₹{artwork.price.toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><span className="font-medium">Size:</span> {artwork.size}</p>
                  <p><span className="font-medium">Medium:</span> {artwork.medium}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!artwork.available}
                  >
                    {artwork.available ? "Add to Cart" : "Sold Out"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-serif text-foreground mb-4">
              No artworks found
            </p>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Commission CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <Card className="bg-secondary/30 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Don't see what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Commission a custom piece that's uniquely yours. Let's create something together.
            </p>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Request Custom Artwork
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shop;
