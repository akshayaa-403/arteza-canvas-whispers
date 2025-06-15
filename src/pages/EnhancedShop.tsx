
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtworkSearch from "@/components/ArtworkSearch";
import EmailSubscription from "@/components/EmailSubscription";
import CartBadge from "@/components/CartBadge";
import { ArrowLeft, ShoppingBag, Heart, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const EnhancedShop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { wishlist } = useCart();

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
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Browse Art
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              My Favorites ({wishlist.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            <ArtworkSearch viewMode={viewMode} />
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
