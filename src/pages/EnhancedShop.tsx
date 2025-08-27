import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ArtworkSearch from "@/components/ArtworkSearch";
import EmailSubscription from "@/components/EmailSubscription";
import CartBadge from "@/components/CartBadge";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Grid3X3, 
  List, 
  Music, 
  Palette, 
  Sparkles, 
  Filter,
  Search,
  Star,
  TrendingUp,
  Eye,
  ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const collections = [
  {
    name: "Dreamscapes",
    description: "Ethereal landscapes that blur the line between reality and imagination",
    color: "arteza-sage",
    icon: "✨",
    spotifyPlaylist: "37i9dQZF1DWWQRwui0ExPn",
    count: 12,
    priceRange: "₹15,000 - ₹35,000"
  },
  {
    name: "Abstract Expressions",
    description: "Bold strokes and vibrant emotions captured in abstract forms",
    color: "arteza-terracotta", 
    icon: "🎨",
    spotifyPlaylist: "37i9dQZF1DX0XUsuxWHRQd",
    count: 18,
    priceRange: "₹12,000 - ₹28,000"
  },
  {
    name: "Cultural Chronicles",
    description: "Stories of heritage and tradition painted with reverence",
    color: "arteza-copper",
    icon: "🏛️",
    spotifyPlaylist: "37i9dQZF1DWZeKCadgRdKQ",
    count: 15,
    priceRange: "₹18,000 - ₹45,000"
  },
  {
    name: "Nature's Palette",
    description: "The raw beauty of nature translated into artistic expression",
    color: "arteza-moss",
    icon: "🌿",
    spotifyPlaylist: "37i9dQZF1DX4sWSpwq3LiO",
    count: 10,
    priceRange: "₹14,000 - ₹32,000"
  }
];

const quickFilters = [
  { name: "All", value: "", color: "bg-gray-100 text-gray-600" },
  { name: "Under ₹20k", value: "under-20k", color: "bg-green-100 text-green-600" },
  { name: "Premium", value: "premium", color: "bg-purple-100 text-purple-600" },
  { name: "New Arrivals", value: "new", color: "bg-blue-100 text-blue-600" },
  { name: "Best Sellers", value: "bestseller", color: "bg-orange-100 text-orange-600" }
];

const EnhancedShop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { wishlist, items } = useCart();
  const fadeInRef = useFadeInOnScroll();

  const totalArtworks = collections.reduce((sum, collection) => sum + collection.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-arteza-sage/20 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Navigation & Cart */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="sm" className="hover:bg-arteza-sage/20">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Badge variant="outline" className="border-arteza-terracotta text-arteza-terracotta">
                {totalArtworks} Artworks Available
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="relative">
                <Heart className="h-4 w-4 mr-1" />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <CartBadge />
            </div>
          </div>
          
          {/* Title & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal flex items-center gap-2">
                ARTEZA Collection
                <Sparkles className="h-6 w-6 text-arteza-terracotta animate-pulse" />
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Discover original artworks by Upasna
              </p>
            </div>
            
            {/* Search & Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/80"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-1 bg-white/80 rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Quick Filters:</span>
            {quickFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(selectedFilter === filter.value ? "" : filter.value)}
                className={`whitespace-nowrap ${filter.color} border-0 hover:scale-105 transition-all duration-200`}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Collections Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-arteza-charcoal mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-arteza-terracotta" />
              Explore Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each collection tells a unique story, paired with carefully curated music to enhance your viewing experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {collections.map((collection, index) => (
              <Card
                key={collection.name}
                className={`group relative overflow-hidden transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl border-2 ${
                  selectedCollection === collection.name 
                    ? `border-${collection.color} bg-gradient-to-br from-${collection.color}/10 to-${collection.color}/5 shadow-lg` 
                    : 'border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedCollection(selectedCollection === collection.name ? null : collection.name)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3 animate-gentle-float">
                      {collection.icon}
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2 text-arteza-charcoal">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {collection.description}
                    </p>
                    
                    {/* Collection Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Artworks:</span>
                        <Badge variant="secondary" className="text-xs">{collection.count}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="text-xs font-medium">{collection.priceRange}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-arteza-terracotta hover:bg-arteza-rust text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCollection(collection.name);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Collection
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://open.spotify.com/playlist/${collection.spotifyPlaylist}`, '_blank');
                        }}
                      >
                        <Music className="h-3 w-3 mr-1" />
                        Playlist
                      </Button>
                    </div>
                    
                    {selectedCollection === collection.name && (
                      <div className="mt-4 p-3 bg-background/80 rounded-lg border animate-slide-in-up">
                        <div className="flex items-center justify-center mb-2">
                          <Badge variant="secondary" className="text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Now Browsing
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Filtering artworks from this collection
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Browse Art
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({wishlist.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            <ArtworkSearch 
              viewMode={viewMode} 
              selectedCollection={selectedCollection}
            />
          </TabsContent>

          <TabsContent value="collections" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <Card key={collection.name} className="group relative overflow-hidden border bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-3xl mb-2">{collection.icon}</div>
                        <h3 className="font-serif font-bold text-xl mb-2 text-arteza-charcoal">
                          {collection.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {collection.description}
                        </p>
                        
                        {/* Collection Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Palette className="h-4 w-4 text-arteza-terracotta" />
                            <span>{collection.count} artworks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>4.8/5 rating</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-4">
                          Price Range: <span className="font-medium">{collection.priceRange}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        className="flex-1 bg-arteza-terracotta hover:bg-arteza-rust text-white"
                        onClick={() => setSelectedCollection(collection.name)}
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        View Collection
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`https://open.spotify.com/playlist/${collection.spotifyPlaylist}`, '_blank')}
                      >
                        <Music className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-8">
            <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-pink-200">
              <CardContent className="p-12 text-center">
                <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4 text-arteza-charcoal">Your Favorite Artworks</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Save artworks you love by clicking the heart icon while browsing. Build your personal collection of favorites!
                </p>
                
                {wishlist.length > 0 ? (
                  <div className="space-y-4">
                    <Badge className="bg-pink-100 text-pink-600 border-pink-200">
                      {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
                    </Badge>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline">
                        View Wishlist
                      </Button>
                      <Button className="bg-arteza-terracotta hover:bg-arteza-rust">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Shop Favorites
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="bg-arteza-terracotta hover:bg-arteza-rust text-white"
                    onClick={() => setSelectedCollection(null)}
                  >
                    Start Browsing Artworks
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Newsletter Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-arteza-sage/20 to-arteza-terracotta/20 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust p-8 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                  Never Miss a Masterpiece ✨
                </h2>
                <p className="opacity-90 max-w-md mx-auto">
                  Get notified about new artworks, exclusive collections, and special offers
                </p>
              </div>
              <div className="p-8">
                <div className="max-w-md mx-auto">
                  <EmailSubscription />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedShop;