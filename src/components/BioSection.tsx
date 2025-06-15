
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export default function BioSection() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section className="relative max-w-3xl mx-auto px-5 py-16 md:py-20" ref={ref}>
      <div className={`flex flex-col md:flex-row items-center justify-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="flex-shrink-0 rounded-full ring-4 ring-arteza-sage overflow-hidden shadow-lg w-36 h-36 md:w-44 md:h-44 bg-arteza-cream/80 animate-fade-in">
          {/* Replace this img with your real portrait */}
          <img src="/lovable-uploads/70f000fb-5e2f-4043-8f69-8a03ea8c9217.png" alt="Upasna's Portrait" className="object-cover w-full h-full"/>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-3 animate-fade-in">Meet Upasna</h2>
          <p className="font-sans italic text-arteza-charcoal/85 text-lg mb-3 leading-snug font-[450] font-handwritten" style={{ fontFamily: `'Playfair Display', 'Georgia', serif`}}>
            “I paint to catch feelings that words can’t say. Art lets me connect, story by story, color by color.”
          </p>
          <p className="text-muted-foreground text-base font-light animate-fade-in delay-150">
            Upasna is a Noida-based artist celebrating storytelling through color and emotion. Her canvases weave dreams, culture, and feeling—meant for thoughtful collectors seeking inspiration.
          </p>
        </div>
      </div>
    </section>
  );
}
