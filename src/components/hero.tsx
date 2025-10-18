import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
      return () => heroElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
                 bg-gradient-to-br from-[var(--hero-bg-start)] via-[var(--hero-bg-mid)] to-[var(--hero-bg-end)]"
    >
      <div
        className="absolute inset-0 bg-[url('/traditional-mate-gourd-and-bombilla-on-wooden-tabl.jpg')] bg-cover bg-center opacity-15 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div
        className={`relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 mt-28 sm:mt-30 md:mt-33 lg:mt-36 leading-tight text-white animate-fade-in text-balance">
        Entra al círculo, mateamos distinto.
      </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto leading-relaxed font-light text-white/90 animate-fade-in-up text-pretty font-[system-ui]">
          Descubrí nuestra colección de mates artesanales, bombillas y accesorios únicos, elaborados con pasión y
          dedicación
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-1 text-black">
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

      <div
        className={`relative z-10 w-full max-w-3xl px-4 mt-2 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
          <img
            src="/mates.png"
            alt="Colección de mates artesanales"
            className="w-full h-auto object-cover"
          />
      </div>
    </section>
  )
}
