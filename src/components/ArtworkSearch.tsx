
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, X, Heart, ShoppingCart, Palette } from "lucide-react";
import { toast } from "sonner";

interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  collection_name: string;
  dominant_colors: string[];
  mood_tags: string[];
  size_category: string;
  price: number;
  availability_status: string;
  technique: string;
  created_year: number;
}

interface SearchFilters {
  query: string;
  collection: string;
  color: string;
  mood: string;
  size: string;
  technique: string;
  priceRange: string;
}

const ArtworkSearch = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    collection: '',
    color: '',
    mood: '',
    size: '',
    technique: '',
    priceRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Get unique filter options
  const collections = [...new Set(artworks.map(a => a.collection_name).filter(Boolean))];
  const colors = [...new Set(artworks.flatMap(a => a.dominant_colors || []))];
  const moods = [...new Set(artworks.flatMap(a => a.mood_tags || []))];
  const techniques = [...new Set(artworks.map(a => a.technique).filter(Boolean))];

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, artworks]);

  const fetchArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("availability_status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArtworks(data || []);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      toast.error("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = artworks;

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(query) ||
        artwork.description?.toLowerCase().includes(query) ||
        artwork.technique?.toLowerCase().includes(query)
      );
    }

    // Collection filter
    if (filters.collection) {
      filtered = filtered.filter(artwork => artwork.collection_name === filters.collection);
    }

    // Color filter
    if (filters.color) {
      filtered = filtered.filter(artwork => 
        artwork.dominant_colors?.includes(filters.color)
      );
    }

    // Mood filter
    if (filters.mood) {
      filtered = filtered.filter(artwork => 
        artwork.mood_tags?.includes(filters.mood)
      );
    }

    // Size filter
    if (filters.size) {
      filtered = filtered.filter(artwork => artwork.size_category === filters.size);
    }

    // Technique filter
    if (filters.technique) {
      filtered = filtered.filter(artwork => artwork.technique === filters.technique);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(artwork => {
        const price = artwork.price || 0;
        switch (filters.priceRange) {
          case 'under-5000': return price < 5000;
          case '5000-10000': return price >= 5000 && price <= 10000;
          case '10000-20000': return price > 10000 && price <= 20000;
          case 'over-20000': return price > 20000;
          default: return true;
        }
      });
    }

    setFilteredArtworks(filtered);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      collection: '',
      color: '',
      mood: '',
      size: '',
      technique: '',
      priceRange: ''
    });
  };

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(artworkId)) {
        newFavorites.delete(artworkId);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(artworkId);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "Price on request";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search artworks by title, description, or technique..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10 border-arteza-sage/30 focus:border-arteza-terracotta"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {Object.values(filters).some(Boolean) && (
            <Badge variant="secondary" className="ml-2">
              {Object.values(filters).filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Collection</label>
                <Select value={filters.collection} onValueChange={(value) => updateFilter('collection', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Collections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Collections</SelectItem>
                    {collections.map(collection => (
                      <SelectItem key={collection} value={collection}>{collection}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <Select value={filters.color} onValueChange={(value) => updateFilter('color', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Colors</SelectItem>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: color }}
                          />
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mood</label>
                <Select value={filters.mood} onValueChange={(value) => updateFilter('mood', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Moods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Moods</SelectItem>
                    {moods.map(mood => (
                      <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <Select value={filters.size} onValueChange={(value) => updateFilter('size', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sizes</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Technique</label>
                <Select value={filters.technique} onValueChange={(value) => updateFilter('technique', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Techniques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Techniques</SelectItem>
                    {techniques.map(technique => (
                      <SelectItem key={technique} value={technique}>{technique}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Prices</SelectItem>
                    <SelectItem value="under-5000">Under ₹5,000</SelectItem>
                    <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                    <SelectItem value="over-20000">Over ₹20,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(false)}>
                Hide Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredArtworks.length} of {artworks.length} artworks
        </p>
      </div>

      {/* Artwork Grid */}
      {filteredArtworks.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No artworks found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or clearing some filters.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
                    onClick={() => toggleFavorite(artwork.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.has(artwork.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                    {formatPrice(artwork.price)}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-arteza-charcoal group-hover:text-arteza-terracotta transition-colors">
                      {artwork.title}
                    </h3>
                    {artwork.collection_name && (
                      <p className="text-sm text-muted-foreground">{artwork.collection_name}</p>
                    )}
                  </div>

                  {artwork.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {artwork.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{artwork.technique}</span>
                    <span className="text-muted-foreground">{artwork.size_category}</span>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    {artwork.mood_tags && artwork.mood_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {artwork.mood_tags.slice(0, 3).map((mood, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {artwork.dominant_colors && artwork.dominant_colors.length > 0 && (
                      <div className="flex gap-2">
                        {artwork.dominant_colors.slice(0, 5).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-arteza-terracotta">
                        {formatPrice(artwork.price)}
                      </span>
                      <Button size="sm" className="bg-arteza-sage hover:bg-arteza-moss">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtworkSearch;
