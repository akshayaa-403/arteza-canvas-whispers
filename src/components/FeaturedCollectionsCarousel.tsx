
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Artwork = {
  id: string;
  title: string;
  image_url: string;
  collection_name: string | null;
};

type CollectionGroup = {
  collection: string;
  artworks: Artwork[];
  cover: string;
};

async function fetchCollections(): Promise<CollectionGroup[]> {
  const { data, error } = await supabase.from("artworks").select("id,title,image_url,collection_name").order("collection_name");
  if (error) throw error;
  const grouped: Record<string, Artwork[]> = {};
  (data as Artwork[]).forEach((art) => {
    if (art.collection_name) {
      grouped[art.collection_name] = grouped[art.collection_name] || [];
      grouped[art.collection_name].push(art);
    }
  });
  // For each group, pick a cover (first artwork)
  return Object.entries(grouped).map(([collection, artworks]) => ({
    collection,
    artworks,
    cover: artworks[0]?.image_url || "",
  }));
}

export default function FeaturedCollectionsCarousel() {
  const { data: collections, isLoading } = useQuery({ queryKey: ["featured-collections"], queryFn: fetchCollections });
  const [active, setActive] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (!collections) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % collections.length), 4000);
    return () => clearTimeout(timer);
  }, [collections, active]);

  if (isLoading || !collections?.length) {
    return (
      <div className="flex justify-center items-center min-h-[280px]">
        <div className="w-24 h-24 rounded-full border-8 border-arteza-sage animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" id="collections">
      <Carousel
        opts={{ loop: true, skipSnaps: true, startIndex: active }}
        className="overflow-visible"
      >
        <CarouselContent>
          {collections.map((group, idx) => (
            <CarouselItem key={group.collection} className={cn(
                "transition-all duration-500",
                idx === active ? "scale-100 opacity-100" : "scale-90 opacity-70 blur-[1px]"
              )}
            >
              <Card
                className={cn(
                  "overflow-hidden relative shadow-md border-arteza-sage/40 duration-200 group min-h-[270px]",
                  idx === active ? "ring-2 ring-arteza-terracotta scale-[1.03]" : "hover:ring-1 hover:ring-arteza-sage"
                )}
              >
                <Link to={`/shop?collection=${encodeURIComponent(group.collection)}`}>
                  <div className="h-56 w-full overflow-hidden bg-muted relative flex items-center justify-center">
                    <img
                      src={group.cover}
                      alt={group.collection}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-arteza-sage/75 text-arteza-charcoal font-serif text-lg px-3 py-1 rounded shadow hover:scale-105 transition">
                      {group.collection}
                    </span>
                  </div>
                  <CardContent className="bg-white/95 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-arteza-charcoal">{group.artworks.length} artworks</span>
                      <Heart className="text-arteza-terracotta h-5 w-5 ml-3 opacity-70" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6 flex gap-2 justify-center">
        {collections.map((_, i) => (
          <button
            key={i}
            className={cn("w-3 h-3 rounded-full transition-all border-2 mx-1",
              i === active ? "bg-arteza-terracotta border-arteza-terracotta" : "bg-white border-arteza-sage"
            )}
            aria-label={`Go to ${collections[i].collection}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
