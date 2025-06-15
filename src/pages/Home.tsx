
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingBag, Loader2, ArrowRight, ArrowLeft, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import EmailSubscription from "@/components/EmailSubscription";

type Artwork = {
  id: string;
  title: string;
  image_url: string;
  price: number | null;
  description: string | null;
  collection_name: string | null;
  dominant_colors: string[] | null;
  mood_tags: string[] | null;
  technique: string | null;
  availability_status: string;
};

const fetchArtworks = async (): Promise<Artwork[]> => {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Artwork[];
};

const Home = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: artworks, isLoading, error } = useQuery({
    queryKey: ["artworks", "home"],
    queryFn: fetchArtworks,
  });

  // Find all unique collections present in artwork data
  const collectionSet = new Set(
    (artworks || []).map((a) => a.collection_name).filter(Boolean)
  );
  const collections = Array.from(collectionSet) as string[];

  // For preview: show collections as tabs, ALL as default
  const [activeCollection, setActiveCollection] = useState<string>("ALL");

  const filteredArtworks =
    activeCollection === "ALL" || !artworks
      ? artworks
      : artworks.filter(
          (a) => a.collection_name === activeCollection
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
      {/* Hero Section */}
      <section className="relative bg-white/80 backdrop-blur-sm border-b border-arteza-sage/20">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex-1 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal drop-shadow-sm mb-4">
              Discover Upasna&apos;s Originals
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl">
              Artworks that evoke emotion, curated collections, and stories told in paint. Find your new favourite piece or browse by mood, size, or theme.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default" className="bg-arteza-terracotta/90 text-white hover:bg-arteza-charcoal transition">
                <Link to="/shop">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop the Collection
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-arteza-charcoal text-arteza-charcoal hover:bg-arteza-sage/40 transition">
                <Link to="#gallery">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Browse Artworks
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-[0_0_320px] flex justify-center md:justify-end items-center">
            {/* Show featured artwork as hero image, fallback if needed */}
            {isLoading ? (
              <div className="w-72 h-72 rounded-lg bg-muted flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-arteza-sage" />
              </div>
            ) : artworks && artworks.length > 0 ? (
              <div className="w-72 h-72 rounded-xl overflow-hidden border-4 border-arteza-terracotta shadow-lg flex items-center">
                <img
                  src={artworks[0].image_url}
                  alt={artworks[0].title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-72 h-72 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                No artwork yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Collection Tabs */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 py-12 md:pt-20 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal tracking-tight">
            Curated Gallery
          </h2>
          {/* View Switchers */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Tabs
          value={activeCollection}
          onValueChange={(val) => setActiveCollection(val)}
          className="mb-10"
        >
          <TabsList className="overflow-x-auto flex gap-1 p-1 rounded-md bg-accent/40">
            <TabsTrigger value="ALL" className="min-w-[100px] font-semibold">
              All
            </TabsTrigger>
            {collections.map((c) => (
              <TabsTrigger key={c} value={c} className="min-w-[100px] font-medium">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Artwork grid/list */}
        <div>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 text-arteza-sage animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-destructive mb-16">Failed to load artworks. Please refresh.</div>
          ) : filteredArtworks && filteredArtworks.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              No artworks in this collection yet.
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
                  : "flex flex-col gap-6"
              }
            >
              {filteredArtworks?.map((art) => (
                <Card
                  key={art.id}
                  className={`group overflow-hidden relative bg-white/90 border-arteza-sage/30 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    viewMode === "grid"
                      ? ""
                      : "flex flex-row items-stretch min-h-[160px]"
                  }`}
                >
                  <Link
                    to={`/shop?artwork=${art.id}`}
                    className={
                      viewMode === "grid"
                        ? ""
                        : "flex flex-col md:flex-row w-full"
                    }
                  >
                    <div
                      className={
                        viewMode === "grid"
                          ? "h-60 w-full relative overflow-hidden"
                          : "w-48 min-w-[6rem] h-40 relative mr-4 flex-shrink-0"
                      }
                    >
                      <img
                        src={art.image_url}
                        alt={art.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {art.collection_name && (
                        <span className="absolute top-3 left-3 bg-arteza-sage/80 text-xs text-arteza-charcoal px-2 py-0.5 rounded shadow font-semibold tracking-wide">
                          {art.collection_name}
                        </span>
                      )}
                    </div>
                    <CardContent
                      className={`z-20 ${
                        viewMode === "grid"
                          ? "pt-4"
                          : "flex flex-col justify-between py-6 px-4 w-full"
                      }`}
                    >
                      <div>
                        <h3 className="text-lg font-serif font-bold text-arteza-charcoal mb-1 truncate">
                          {art.title}
                        </h3>
                        {art.description && (
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                            {art.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-arteza-terracotta font-semibold text-lg">
                            {art.price == null ? "Contact for Price" : `₹${art.price.toLocaleString()}`}
                          </span>
                          {art.availability_status && (
                            <span
                              className={`ml-2 px-2 py-0.5 text-xs rounded font-medium ${
                                art.availability_status === "available"
                                  ? "bg-arteza-sage/90 text-arteza-charcoal"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {art.availability_status}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                  {/* Action buttons (favorite etc.) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                    <Button variant="ghost" size="icon" className="text-arteza-terracotta hover:bg-arteza-blush/40" aria-label="Add to favorites">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Email/Newsletter Subscription */}
      <section className="max-w-2xl mx-auto my-16 px-4">
        <div className="bg-white/90 rounded-2xl shadow-lg py-10 px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-2">
              Stay Inspired
            </h2>
            <p className="text-muted-foreground">
              Be the first to know about new originals, collection drops, and exclusive updates from Upasna’s studio.
            </p>
          </div>
          <EmailSubscription />
        </div>
      </section>

      {/* Visual Quote */}
      <section className="py-12 px-4 text-center">
        <blockquote className="text-2xl md:text-3xl font-serif italic text-arteza-charcoal max-w-3xl mx-auto mb-4">
          &quot;Every brushstroke is a heartbeat, every color a whispered secret.&quot;
        </blockquote>
        <p className="text-lg text-arteza-terracotta font-medium">— Upasna</p>
      </section>

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
