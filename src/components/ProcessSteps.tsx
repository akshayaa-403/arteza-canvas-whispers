
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const steps = [
  {
    step: "Inspiration",
    icon: (
      <svg viewBox="0 0 34 34" width={36} height={36}>
        <ellipse cx="17" cy="17" rx="16" ry="13" fill="#e4a373" fillOpacity="0.18"/>
        <path d="M13 22 C13 13, 21 15, 21 22" stroke="#d2845a" strokeWidth="2" fill="none"/>
      </svg>
    ),
    desc: "Each journey starts with a spark—nature, words, or a feeling."
  },
  {
    step: "Sketch",
    icon: (
      <svg viewBox="0 0 34 34" width={36} height={36}>
        <ellipse cx="17" cy="20" rx="12" ry="6" fill="#ddebc4" fillOpacity="0.16"/>
        <rect x="13" y="11" width="8" height="5" fill="#b8805a" opacity="0.3"/>
      </svg>
    ),
    desc: "Rough shapes, pencil lines, exploring composition and emotion."
  },
  {
    step: "Color & Texture",
    icon: (
      <svg viewBox="0 0 42 34" width={36} height={36}>
        <ellipse cx="22" cy="17" rx="18" ry="8" fill="#d2845a" fillOpacity="0.13"/>
        <circle cx="21" cy="17" r="5" fill="#e4a373" />
      </svg>
    ),
    desc: "Building up layers—acrylics, oils, pigments, texture for feeling."
  },
  {
    step: "Finish & Reflect",
    icon: (
      <svg viewBox="0 0 34 34" width={36} height={36}>
        <ellipse cx="14" cy="17" rx="12" ry="10" fill="#ddebc4" fillOpacity="0.2"/>
        <circle cx="21" cy="16" r="6" fill="#e4a373" fillOpacity="0.44"/>
      </svg>
    ),
    desc: "Step back, breathe, and add the last detail—a signature touch."
  },
];

export default function ProcessSteps() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section className="relative bg-gradient-to-br from-white/90 to-arteza-sage/40 py-14 md:py-24" ref={ref}>
      <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-10">
        My Process
      </h2>
      <div className={`flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-5xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 min-w-[180px] bg-white/95 rounded-2xl shadow pb-6 pt-7 px-4 flex flex-col items-center relative group hover:shadow-md transition hover:-translate-y-2 duration-300">
            <div>{step.icon}</div>
            <div className="my-2 font-serif text-lg font-black text-arteza-terracotta">{step.step}</div>
            <span className="w-7 h-0.5 rounded-full bg-arteza-sage mb-2"></span>
            <p className="text-center text-muted-foreground text-[15px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
