
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-arteza-ivory relative overflow-hidden">
      {/* Floating watercolor elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-arteza-blush rounded-full opacity-60 animate-watercolor-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-arteza-peach rounded-full opacity-50 animate-watercolor-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-arteza-olive rounded-full opacity-40 animate-watercolor-float" style={{ animationDelay: '2s' }} />
      
      <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
        {/* Hand-drawn style illustration */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto relative">
            {/* Paint palette illustration */}
            <div className="absolute inset-0 bg-arteza-blush rounded-full opacity-20 animate-gentle-float" />
            <div className="absolute top-4 left-8 w-8 h-8 bg-arteza-indigo rounded-full opacity-60" />
            <div className="absolute top-12 right-12 w-6 h-6 bg-arteza-peach rounded-full opacity-70" />
            <div className="absolute bottom-8 left-12 w-10 h-10 bg-arteza-olive rounded-full opacity-50" />
            
            {/* Paintbrush */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
              <div className="w-2 h-24 bg-arteza-brown rounded-full" />
              <div className="w-6 h-8 bg-arteza-charcoal rounded-full -mt-2 ml-0.5" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-arteza-charcoal mb-6 animate-brush-stroke">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-arteza-indigo mb-4">
          Oops! Looks like this page wandered off canvas...
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
          Sometimes even the most carefully planned compositions go a bit astray. 
          Don't worry though - let's get you back to where the art lives.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300 hover-brush-stroke"
          >
            <Link to="/">Return to Gallery</Link>
          </Button>
          
          <Button 
            variant="outline"
            asChild
            size="lg"
            className="border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush transition-all duration-300"
          >
            <Link to="/shop">Browse Artworks</Link>
          </Button>
        </div>

        {/* Artistic touch */}
        <div className="mt-12 relative">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-arteza-blush to-transparent opacity-50 animate-brush-stroke" />
          <p className="text-sm text-muted-foreground mt-4 italic font-serif">
            "Every mistake is just a happy accident waiting to become art." — Studio Wisdom
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
