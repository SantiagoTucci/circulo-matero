import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Instagram, ShoppingCart, CheckCircle } from "lucide-react"
import { sampleProducts } from "../../public/productos/productos"
import { useCart } from "@/hooks/cart-context"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { InfiniteCarousel } from "@/components/infinite-carousel"

export default function Home() {
  const { addItem, toggleCart } = useCart()

  const carouselImages = [
    "/carousel-images/messi-mateando.jpg",
    "/carousel-images/mateychipa.jpg",
    "/carousel-images/mate-auto.jpg",
    "/carousel-images/mate-sur.jpg",
    "/carousel-images/lago-mate.jpg",
    "/carousel-images/dos-manos-mate.webp",
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      {/* 🛍️ Productos */}
      <main id="productos" className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Nuestra Colección</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-[system-ui]">
            Cada mate es una pieza única, elaborada con materiales nobles y técnicas tradicionales.
          </p>
        </motion.div>

        {/* 🧉 Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => {
            const [added, setAdded] = useState(false)

            const handleAdd = () => {
              addItem(product)
              toggleCart()
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
            }

            return (
              <div
                key={product.id}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm font-[system-ui]">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toLocaleString("es-AR")}
                    </span>

                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                    <Button
                      size="lg"
                      onClick={handleAdd}
                      className={`rounded-lg font-[system-ui] flex items-center gap-1 !p-4 transition-all ${
                        added
                          ? "bg-green-600 text-white hover:!bg-green-200 hover:text-black"
                          : "bg-primary text-white hover:bg-primary/80"
                      }`}
                    >
                      {added ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Agregado
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Agregar
                        </>
                      )}
                    </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* 🧉 Sección Nosotros */}
      <section id="nosotros" className="bg-muted/30 py-25">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              Somos tres amigos unidos por la pasión y la tradición del mate. Este emprendimiento nació para compartir
              la calidez, el encuentro y la identidad que el mate simboliza para todos los argentinos, a través de
              productos de calidad.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InfiniteCarousel images={carouselImages} speed={40} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              {[
                { value: 1, suffix: "+", label: "Año de experiencia" },
                { value: 3, suffix: "", label: "Amigos y fundadores" },
                { value: 50, suffix: "+", label: "Clientes felices" },
                { value: 100, suffix: "%", label: "Artesanal y de calidad" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedNumber value={item.value} />
                    {item.suffix}
                  </div>
                  <div className="text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 💬 Sección Contacto */}
      <section id="contacto" className="py-25 text-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* 📞 Texto y Botones */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left order-first md:order-1"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Contactanos</h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                ¿Tenés alguna duda? Escribinos y te respondemos.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start mb-8">
                <Button
                  size="lg"
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-white hover:!text-black cursor-pointer"
                  onClick={() => window.open("https://wa.me/5491161706060", "_blank")}
                >
                  WhatsApp
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-white !text-black hover:!text-white shadow-lg hover:scale-105 transition-transform"
                >
                  <a href="https://www.instagram.com/circulomatero.ok/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
              </div>

              <motion.div
                className="flex justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <img
                  src="/carousel-images/instagram-feed.png"
                  alt="Instagram Círculo Matero"
                  className="w-100 xl:w-120 max-w-full h-auto transition-all duration-300 hover:-translate-y-2 drop-shadow-lg shadow-sm hover:shadow-xl rounded-2xl overflow-hidden"
                />
              </motion.div>

              <p className="text-md sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mt-9">
                🧉 Seguinos en <span className="font-semibold text-primary">TikTok</span> e
                <span className="font-semibold text-primary"> Instagram</span>! <br />
                Subimos nuevos productos y contenido divertido todas las semanas.
              </p>
            </motion.div>

            {/* 🎥 Video de TikTok */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center order-last md:order-2"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.tiktok.com/embed/7556644757905198392"
                  allowFullScreen
                  title="Video de Círculo Matero"
                  className="w-full h-full rounded-2xl border-0"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🦶 Footer */}
      <motion.footer
        className="bg-foreground text-background py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm opacity-80">© 2025 Círculo Matero. Todos los derechos reservados.</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm opacity-80">Hecho por</span>
            <a
              href="https://www.instagram.com/tucciwebstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-100 opacity-80 transition"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-md font-semibold">Tucci Web Studio</span>
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest))

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    })
    return () => controls.stop()
  }, [value])

  return <motion.span>{rounded}</motion.span>
}
