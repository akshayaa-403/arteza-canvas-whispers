import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ArtworkSearch from "@/components/ArtworkSearch";
import EmailSubscription from "@/components/EmailSubscription";
import CartBadge from "@/components/CartBadge";
import { ArrowLeft, Heart, Grid3X3, List, Music, Palette, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const collections = [
  {
    name: "Dreamscapes",
    description: "Ethereal landscapes that blur the line between reality and imagination",
    color: "arteza-sage",
    icon: "✨",
    spotifyPlaylist: "37i9dQZF1DWWQRwui0ExPn"
  },
  {
    name: "Abstract Expressions",
    description: "Bold strokes and vibrant emotions captured in abstract forms",
    color: "arteza-terracotta", 
    icon: "🎨",
    spotifyPlaylist: "37i9dQZF1DX0XUsuxWHRQd"
  },
  {
    name: "Cultural Chronicles",
    description: "Stories of heritage and tradition painted with reverence",
    color: "arteza-copper",
    icon: "🏛️",
    spotifyPlaylist: "37i9dQZF1DWZeKCadgRdKQ"
  },
  {
    name: "Nature's Palette",
    description: "The raw beauty of nature translated into artistic expression",
    color: "arteza-moss",
    icon: "🌿",
    spotifyPlaylist: "37i9dQZF1DX4sWSpwq3LiO"
  }
];

const EnhancedShop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { wishlist } = useCart();
  const fadeInRef = useFadeInOnScroll();
  const [searchParams] = useSearchParams();

  // Map color tokens to static Tailwind classes to avoid dynamic class generation issues
  const colorClassMap: Record<string, { border: string; bgFromTo: string }> = {
    'arteza-sage': { border: 'border-arteza-sage', bgFromTo: 'from-arteza-sage/10 to-arteza-sage/5' },
    'arteza-terracotta': { border: 'border-arteza-terracotta', bgFromTo: 'from-arteza-terracotta/10 to-arteza-terracotta/5' },
    'arteza-copper': { border: 'border-arteza-copper', bgFromTo: 'from-arteza-copper/10 to-arteza-copper/5' },
    'arteza-moss': { border: 'border-arteza-moss', bgFromTo: 'from-arteza-moss/10 to-arteza-moss/5' },
  };

  // Initialize/sync selected collection from URL param if present
  useEffect(() => {
    const urlCollection = searchParams.get('collection');
    if (urlCollection) {
      setSelectedCollection(urlCollection);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-arteza-sage/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="ml-auto">
              <CartBadge />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-arteza-charcoal">
                ARTEZA Collection
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover original artworks by Upasna
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Art Collections Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-arteza-charcoal mb-4">
              Explore Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each collection tells a unique story, paired with carefully curated music to enhance your viewing experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" ref={fadeInRef}>
            {collections.map((collection, index) => (
              <div
                key={collection.name}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer hover:scale-105 ${
                  selectedCollection === collection.name 
                    ? `${colorClassMap[collection.color]?.border} bg-gradient-to-br ${colorClassMap[collection.color]?.bgFromTo}`
                    : 'border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedCollection(selectedCollection === collection.name ? null : collection.name)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                  
                  {/* Spotify Integration */}
                  <div className="flex items-center justify-center gap-2 text-xs text-arteza-clay">
                    <Music className="h-3 w-3" />
                    <span>Curated Playlist</span>
                  </div>
                  
                  {selectedCollection === collection.name && (
                    <div className="mt-4 p-3 bg-background/80 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Now Playing
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://open.spotify.com/playlist/${collection.spotifyPlaylist}`, '_blank');
                          }}
                        >
                          <Music className="h-3 w-3 mr-1" />
                          Open Spotify
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Listen to music that inspired this collection
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
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
            <ArtworkSearch viewMode={viewMode} selectedCollection={selectedCollection} />
          </TabsContent>

          <TabsContent value="collections" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <div key={collection.name} className="group relative overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-sm">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-3xl mb-2">{collection.icon}</div>
                        <h3 className="font-serif font-bold text-xl mb-2 text-arteza-charcoal">
                          {collection.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedCollection(collection.name)}
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        View Collection
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => window.open(`https://open.spotify.com/playlist/${collection.spotifyPlaylist}`, '_blank')}
                      >
                        <Music className="h-4 w-4 mr-2" />
                        Listen on Spotify
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-8">
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your Favorite Artworks</h3>
              <p className="text-muted-foreground mb-4">
                Save artworks you love by clicking the heart icon while browsing.
              </p>
              {wishlist.length > 0 && (
                <p className="text-sm text-arteza-indigo">
                  You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Email Subscription */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-2">
              Stay Inspired
            </h2>
            <p className="text-muted-foreground">
              Be the first to know about new artworks and exclusive collections
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <EmailSubscription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedShop;