
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, Heart, ShoppingCart, Palette } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

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

interface ArtworkSearchProps {
  viewMode?: 'grid' | 'list';
  selectedCollection?: string | null;
}

// Complete artwork data with all 30 pieces (10 from each set)
const ARTWORK_DATA: Artwork[] = [
  // 1/3 Collection - Abstract Expressions
  {
    id: "abs-1",
    title: "Flowing Harmony",
    description: "Dynamic abstract composition with flowing forms in vibrant blues and warm yellows",
    image_url: "/lovable-uploads/4aca53da-8e86-4b79-9512-bb3f47b5bfaf.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["blue", "yellow", "orange"],
    mood_tags: ["energetic", "flowing", "vibrant"],
    size_category: "medium",
    price: 18500,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "abs-2",
    title: "Geometric Dreams",
    description: "Bold geometric blocks intersecting with organic forms in a contemporary style",
    image_url: "/lovable-uploads/a1cbe5a2-9372-4cfe-bd94-df0d009afee3.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["green", "blue", "yellow"],
    mood_tags: ["structured", "modern", "bold"],
    size_category: "large",
    price: 22000,
    availability_status: "available",
    technique: "Mixed Media",
    created_year: 2024
  },
  {
    id: "abs-3",
    title: "Fire Dance",
    description: "Passionate brushstrokes create a dance of fire and energy in orange and blue",
    image_url: "/lovable-uploads/2daffa9b-eefe-4c41-b3bd-ff506744d738.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["orange", "blue", "black"],
    mood_tags: ["passionate", "dynamic", "intense"],
    size_category: "medium",
    price: 16500,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "abs-4",
    title: "Urban Energy",
    description: "Explosive abstract composition capturing the energy of urban life",
    image_url: "/lovable-uploads/706133f8-6530-4710-ba9a-bf35c01a6226.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["blue", "red", "white"],
    mood_tags: ["energetic", "urban", "explosive"],
    size_category: "large",
    price: 19500,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "abs-5",
    title: "Urban Reverie",
    description: "Modern cityscape rendered in ethereal blues and purples, capturing urban dreams",
    image_url: "/lovable-uploads/2fdc10b4-ffea-4489-add4-4f8c675abe02.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["blue", "purple", "white"],
    mood_tags: ["modern", "urban", "atmospheric"],
    size_category: "large",
    price: 26000,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "abs-6",
    title: "Metropolitan Blues",
    description: "Vibrant cityscape with towering buildings against a dramatic blue sky",
    image_url: "/lovable-uploads/d3e9dadb-b15f-4127-a1a7-072ba2f94ff8.png",
    collection_name: "Abstract Expressions",
    dominant_colors: ["blue", "orange", "white"],
    mood_tags: ["urban", "dramatic", "architectural"],
    size_category: "large",
    price: 28000,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  
  // 1/3 Collection - Dreamscape
  {
    id: "dream-1",
    title: "Eternal Embrace",
    description: "An intimate moment captured against a backdrop of geometric dreams and floral beauty",
    image_url: "/lovable-uploads/ae9ada26-59ac-4fb5-b908-3036ec05f3de.png",
    collection_name: "Dreamscape",
    dominant_colors: ["green", "pink", "blue"],
    mood_tags: ["romantic", "intimate", "dreamy"],
    size_category: "large",
    price: 28000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "dream-2",
    title: "Mystic Stallion",
    description: "An ethereal white horse galloping through a dreamlike sunset landscape",
    image_url: "/lovable-uploads/3cba9e2c-f145-4a4e-a4b7-70e4d8b2dc57.png",
    collection_name: "Dreamscape",
    dominant_colors: ["white", "orange", "blue"],
    mood_tags: ["ethereal", "mystical", "powerful"],
    size_category: "large",
    price: 31000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "dream-3",
    title: "Golden Serenity",
    description: "Peaceful portrait of a woman in contemplative grace with golden tones",
    image_url: "/lovable-uploads/895e49c8-d33b-4e31-9371-edf109d7092a.png",
    collection_name: "Dreamscape",
    dominant_colors: ["gold", "red", "blue"],
    mood_tags: ["serene", "contemplative", "graceful"],
    size_category: "medium",
    price: 26000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "dream-4",
    title: "Ethereal Beauty",
    description: "Soft portrait capturing feminine grace with flowing hair and gentle expression",
    image_url: "/lovable-uploads/52141c2d-547e-4d93-8bbd-5ca59e215373.png",
    collection_name: "Dreamscape",
    dominant_colors: ["brown", "blue", "white"],
    mood_tags: ["gentle", "feminine", "ethereal"],
    size_category: "medium",
    price: 24000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "dream-5",
    title: "Icon of Grace",
    description: "Classic portrait inspired by timeless beauty and golden age glamour",
    image_url: "/lovable-uploads/ebc8450a-e8b8-4088-beda-c16dedc7c165.png",
    collection_name: "Dreamscape",
    dominant_colors: ["gold", "blue", "red"],
    mood_tags: ["glamorous", "iconic", "timeless"],
    size_category: "medium",
    price: 29000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  
  // 1/3 Collection - Cultural Chronicles
  {
    id: "cult-1",
    title: "Silent Strength",
    description: "A powerful portrait capturing inner strength and contemplation",
    image_url: "/lovable-uploads/01240ce5-9b46-4aef-9ba5-06d2e0ea87e1.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["black", "white", "red"],
    mood_tags: ["contemplative", "strong", "mysterious"],
    size_category: "medium",
    price: 24000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "cult-2",
    title: "Floral Mystique",
    description: "Decorative portrait blending traditional beauty with contemporary floral elements",
    image_url: "/lovable-uploads/63aa7c78-e8d3-483d-a655-851f38c1daf6.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["blue", "gold", "white"],
    mood_tags: ["elegant", "decorative", "mystical"],
    size_category: "large",
    price: 32000,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "cult-3",
    title: "Heritage Spirit",
    description: "Traditional Indian art celebrating cultural heritage with intricate patterns",
    image_url: "/lovable-uploads/ab19cde5-c0a6-471f-88d1-783cc0b815b5.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["yellow", "red", "blue"],
    mood_tags: ["traditional", "cultural", "ornate"],
    size_category: "large",
    price: 35000,
    availability_status: "available",
    technique: "Traditional Pigments",
    created_year: 2024
  },
  {
    id: "cult-4",
    title: "Divine Visage",
    description: "Sacred golden face with traditional spiritual symbols and deep blue background",
    image_url: "/lovable-uploads/56fe82f2-ba5e-41b2-8998-e9040e2da26a.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["yellow", "blue", "red"],
    mood_tags: ["spiritual", "sacred", "powerful"],
    size_category: "medium",
    price: 29000,
    availability_status: "available",
    technique: "Traditional Pigments",
    created_year: 2024
  },
  {
    id: "cult-5",
    title: "Trinity of Deities",
    description: "Intricate black and white artwork featuring three divine faces with ornate patterns",
    image_url: "/lovable-uploads/48201e01-d25e-4c6e-9cd6-270a20361f1c.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["black", "white", "red"],
    mood_tags: ["intricate", "divine", "traditional"],
    size_category: "large",
    price: 38000,
    availability_status: "available",
    technique: "Ink on Paper",
    created_year: 2024
  },
  {
    id: "cult-6",
    title: "Koi Harmony",
    description: "Traditional red and white fish pattern symbolizing prosperity and good fortune",
    image_url: "/lovable-uploads/d78d12f1-6a21-462e-a2a4-e821a023189a.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["red", "white", "black"],
    mood_tags: ["traditional", "harmonious", "symbolic"],
    size_category: "medium",
    price: 22000,
    availability_status: "available",
    technique: "Traditional Pigments",
    created_year: 2024
  },
  {
    id: "cult-7",
    title: "Azure Fish",
    description: "Detailed fish artwork with intricate patterns on a deep blue background",
    image_url: "/lovable-uploads/1d6463c0-306d-4155-a2ed-f7b89fbd3d62.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["blue", "white", "black"],
    mood_tags: ["detailed", "peaceful", "traditional"],
    size_category: "medium",
    price: 20000,
    availability_status: "available",
    technique: "Mixed Media",
    created_year: 2024
  },
  {
    id: "cult-8",
    title: "Peacock Mandala",
    description: "Ornate peacock design with geometric patterns and vibrant colors",
    image_url: "/lovable-uploads/df3f7bf5-4998-4f8e-982a-92bf9554e7eb.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["blue", "red", "white"],
    mood_tags: ["ornate", "geometric", "vibrant"],
    size_category: "large",
    price: 33000,
    availability_status: "available",
    technique: "Mixed Media",
    created_year: 2024
  },
  {
    id: "cult-9",
    title: "Ancient Warrior",
    description: "Traditional Indian warrior depicted with ornate decorations and rich golden tones",
    image_url: "/lovable-uploads/4185a1bb-5dd9-464d-88b7-16aa4f3d0825.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["gold", "orange", "brown"],
    mood_tags: ["traditional", "regal", "powerful"],
    size_category: "large",
    price: 36000,
    availability_status: "available",
    technique: "Traditional Pigments",
    created_year: 2024
  },
  {
    id: "cult-10",
    title: "Spiritual Portrait",
    description: "Detailed pencil portrait capturing spiritual essence and inner peace",
    image_url: "/lovable-uploads/a60aa9d2-d666-47cb-9ebb-d23db15a98a5.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["black", "white", "gray"],
    mood_tags: ["spiritual", "peaceful", "detailed"],
    size_category: "medium",
    price: 18000,
    availability_status: "available",
    technique: "Graphite on Paper",
    created_year: 2024
  },
  {
    id: "cult-11",
    title: "Joyful Embrace",
    description: "Heartwarming pencil portrait capturing joy and human connection",
    image_url: "/lovable-uploads/70f000fb-5e2f-4043-8f69-8a03ea8c9217.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["black", "white", "gray"],
    mood_tags: ["joyful", "warm", "human"],
    size_category: "medium",
    price: 19000,
    availability_status: "available",
    technique: "Graphite on Paper",
    created_year: 2024
  },
  {
    id: "cult-12",
    title: "Village Stories",
    description: "Folk art depicting village women in traditional style with earthy tones",
    image_url: "/lovable-uploads/7c4380d4-9ddb-4b20-a41c-2155705e36b9.png",
    collection_name: "Cultural Chronicles",
    dominant_colors: ["red", "green", "yellow"],
    mood_tags: ["folk", "traditional", "storytelling"],
    size_category: "large",
    price: 30000,
    availability_status: "available",
    technique: "Tempera on Canvas",
    created_year: 2024
  },
  
  // 1/3 Collection - Nature's Palette
  {
    id: "nature-1",
    title: "Mountain Serenity",
    description: "Peaceful mountain landscape with delicate cherry blossoms in traditional style",
    image_url: "/lovable-uploads/e55e93b3-d6d7-4f5c-81ae-d979fcad858d.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["blue", "white", "pink"],
    mood_tags: ["serene", "peaceful", "natural"],
    size_category: "medium",
    price: 21000,
    availability_status: "available",
    technique: "Watercolor",
    created_year: 2024
  },
  {
    id: "nature-2",
    title: "Garden's Bounty",
    description: "Vibrant still life celebrating nature's abundance with flowers and wine",
    image_url: "/lovable-uploads/f8087b88-83bd-4776-b209-f089d65397c0.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["yellow", "blue", "purple"],
    mood_tags: ["abundant", "celebratory", "warm"],
    size_category: "medium",
    price: 17500,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "nature-3",
    title: "Tranquil Lake",
    description: "Serene lake landscape with mountains and sunset reflections",
    image_url: "/lovable-uploads/00a67580-8ae1-4570-98b5-959e07b1a99f.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["blue", "yellow", "orange"],
    mood_tags: ["tranquil", "reflective", "scenic"],
    size_category: "large",
    price: 27000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  },
  {
    id: "nature-4",
    title: "Village by Mount Fuji",
    description: "Traditional Japanese village scene with Mount Fuji and cherry blossoms",
    image_url: "/lovable-uploads/f59e5f92-95ad-487d-8faa-f73fa22aee54.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["blue", "white", "brown"],
    mood_tags: ["traditional", "scenic", "peaceful"],
    size_category: "large",
    price: 34000,
    availability_status: "available",
    technique: "Watercolor",
    created_year: 2024
  },
  {
    id: "nature-5",
    title: "Pastoral Paradise",
    description: "Idyllic countryside scene with sheep grazing under blooming trees",
    image_url: "/lovable-uploads/bcef1f0b-8fb0-4560-a2a4-0f634608bcb9.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["green", "blue", "white"],
    mood_tags: ["pastoral", "peaceful", "idyllic"],
    size_category: "medium",
    price: 23000,
    availability_status: "available",
    technique: "Acrylic on Canvas",
    created_year: 2024
  },
  {
    id: "nature-6",
    title: "Rose Trio",
    description: "Delicate watercolor study of three pink roses with expressive brushwork",
    image_url: "/lovable-uploads/712d6581-b2a4-4d90-b5fd-bf4ac43d8667.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["pink", "green", "blue"],
    mood_tags: ["delicate", "romantic", "fresh"],
    size_category: "small",
    price: 15000,
    availability_status: "available",
    technique: "Watercolor",
    created_year: 2024
  },
  {
    id: "nature-7",
    title: "Lotus Meditation",
    description: "Peaceful lotus flower painting symbolizing purity and enlightenment",
    image_url: "/lovable-uploads/5b3d3e4c-e767-4b4a-9b81-c12cacd1a498.png",
    collection_name: "Nature's Palette",
    dominant_colors: ["pink", "green", "white"],
    mood_tags: ["peaceful", "meditative", "spiritual"],
    size_category: "small",
    price: 16000,
    availability_status: "available",
    technique: "Oil on Canvas",
    created_year: 2024
  }
];

const ArtworkSearch = ({ viewMode = 'grid', selectedCollection }: ArtworkSearchProps) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    collection: 'all-collections',
    color: 'all-colors',
    mood: 'all-moods',
    size: 'all-sizes',
    technique: 'all-techniques',
    priceRange: 'all-prices'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique filter options
  const collections = [...new Set(artworks.map(a => a.collection_name).filter(Boolean))];
  const colors = [...new Set(artworks.flatMap(a => a.dominant_colors || []))];
  const moods = [...new Set(artworks.flatMap(a => a.mood_tags || []))];
  const techniques = [...new Set(artworks.map(a => a.technique).filter(Boolean))];

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    // Load artwork data immediately
    setArtworks(ARTWORK_DATA);
    setLoading(false);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, artworks, selectedCollection]);

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
    if (filters.collection && filters.collection !== 'all-collections') {
      filtered = filtered.filter(artwork => artwork.collection_name === filters.collection);
    }
    
    // Selected collection filter (from parent component)
    if (selectedCollection) {
      filtered = filtered.filter(artwork => artwork.collection_name === selectedCollection);
    }

    // Color filter
    if (filters.color && filters.color !== 'all-colors') {
      filtered = filtered.filter(artwork => 
        artwork.dominant_colors?.includes(filters.color)
      );
    }

    // Mood filter
    if (filters.mood && filters.mood !== 'all-moods') {
      filtered = filtered.filter(artwork => 
        artwork.mood_tags?.includes(filters.mood)
      );
    }

    // Size filter
    if (filters.size && filters.size !== 'all-sizes') {
      filtered = filtered.filter(artwork => artwork.size_category === filters.size);
    }

    // Technique filter
    if (filters.technique && filters.technique !== 'all-techniques') {
      filtered = filtered.filter(artwork => artwork.technique === filters.technique);
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== 'all-prices') {
      filtered = filtered.filter(artwork => {
        const price = artwork.price || 0;
        switch (filters.priceRange) {
          case 'under-15000': return price < 15000;
          case '15000-25000': return price >= 15000 && price <= 25000;
          case '25000-35000': return price > 25000 && price <= 35000;
          case 'over-35000': return price > 35000;
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
      collection: 'all-collections',
      color: 'all-colors',
      mood: 'all-moods',
      size: 'all-sizes',
      technique: 'all-techniques',
      priceRange: 'all-prices'
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
          {Object.values(filters).some(value => value && !value.startsWith('all-')) && (
            <Badge variant="secondary" className="ml-2">
              {Object.values(filters).filter(value => value && !value.startsWith('all-')).length}
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
                    <SelectItem value="all-collections">All Collections</SelectItem>
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
                    <SelectItem value="all-colors">All Colors</SelectItem>
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
                    <SelectItem value="all-moods">All Moods</SelectItem>
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
                    <SelectItem value="all-sizes">All Sizes</SelectItem>
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
                    <SelectItem value="all-techniques">All Techniques</SelectItem>
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
                    <SelectItem value="all-prices">All Prices</SelectItem>
                    <SelectItem value="under-15000">Under ₹15,000</SelectItem>
                    <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                    <SelectItem value="25000-35000">₹25,000 - ₹35,000</SelectItem>
                    <SelectItem value="over-35000">Over ₹35,000</SelectItem>
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

      {/* Artwork Grid/List */}
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
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className={`group overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
              viewMode === 'list' ? 'flex flex-row' : ''
            }`}>
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
              }`}>
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
                    onClick={() => toggleWishlist(artwork.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${isInWishlist(artwork.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
                    onClick={() => addToCart({
                      id: artwork.id,
                      title: artwork.title,
                      price: artwork.price || 0,
                      image_url: artwork.image_url,
                      size_category: artwork.size_category,
                      technique: artwork.technique
                    })}
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Price Badge */}
                {viewMode === 'grid' && (
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                      {formatPrice(artwork.price)}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className={`space-y-3 ${viewMode === 'list' ? 'flex flex-col justify-between h-full' : ''}`}>
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

                  {viewMode === 'list' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{artwork.technique}</span>
                      <span className="text-muted-foreground">{artwork.size_category}</span>
                    </div>
                  )}

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
                      <Button 
                        size="sm" 
                        className="bg-arteza-sage hover:bg-arteza-moss"
                        onClick={() => addToCart({
                          id: artwork.id,
                          title: artwork.title,
                          price: artwork.price || 0,
                          image_url: artwork.image_url,
                          size_category: artwork.size_category,
                          technique: artwork.technique
                        })}
                      >
                        Add to Cart
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
