
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const testimonials = [
  {
    name: "Priya S.",
    note: "“Upasna’s painting made our home warmer—her stories glow off the canvas!”"
  },
  {
    name: "Milan P.",
    note: "“Every time I glance, I see something new. There’s magic in her brushwork.”"
  },
  {
    name: "Rohit K.",
    note: "“The process felt personal and joyful. Upasna understands art *and* people.”"
  }
];

export default function TestimonialsSection() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section className="py-16 px-4" ref={ref}>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-arteza-charcoal mb-10">What Collectors Say</h2>
      <div className={`flex flex-col md:flex-row md:justify-center items-stretch gap-6 max-w-5xl mx-auto transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative bg-arteza-cream/95 rounded-md p-6 max-w-sm shadow flex-1 border border-arteza-sage/10 group"
            style={{
              transform: `rotate(${(i - 1) * 5}deg)`,
              zIndex: 30 - i,
              filter: visible ? "none" : "blur(4px)",
            }}
          >
            <svg className="absolute -top-7 left-10 w-20 h-10 opacity-25 rotate-[-12deg]" viewBox="0 0 140 60" fill="none">
              <ellipse cx="70" cy="34" rx="70" ry="21" fill="#d2845a" fillOpacity="0.13"/>
            </svg>
            <p className="font-serif italic text-lg leading-6 text-arteza-charcoal mb-4 font-medium">{t.note}</p>
            <span className="text-arteza-terracotta font-semibold block text-right font-handwritten" style={{ fontFamily: `'Playfair Display', serif` }}>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
