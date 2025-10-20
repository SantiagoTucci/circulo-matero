// Hero.tsx
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const heroElement = heroRef.current;
    heroElement?.addEventListener("mousemove", handleMouseMove);
    return () => heroElement?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background con parallax */}
      <div
        className="absolute inset-0 bg-[url('/traditional-mate-gourd-and-bombilla-on-wooden-tabl.jpg')] bg-cover bg-center opacity-15 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)`,
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Texto principal */}
      <div
        className={`relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 mt-28 sm:mt-30 md:mt-33 lg:mt-36 leading-tight text-white animate-fade-in text-balance">
          Entra al círculo, mateamos distinto.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto leading-relaxed font-light text-white/90 animate-fade-in-up text-pretty font-[system-ui]">
          Descubrí nuestra colección de mates artesanales, bombillas y accesorios únicos, elaborados con pasión y dedicación
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-1">
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="bg-white !text-black hover:bg-white/80 font-semibold px-8 py-6 text-lg rounded-xl font-[system-ui] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            Ver los productos
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Imagen de mates */}
      <div
        className={`relative z-10 w-full max-w-3xl px-4 mt-2 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <img
          src="/mates.png"
          alt="Colección de mates artesanales"
          className="w-full max-w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
