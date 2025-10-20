import { motion } from "framer-motion"

interface InfiniteCarouselProps {
  images: string[]
  speed?: number
}

export function InfiniteCarousel({ images, speed = 30 }: InfiniteCarouselProps) {
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative w-full overflow-hidden py-6.5">
      {/* Gradientes para suavizar los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

      {/* Contenedor del carrusel */}
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -40 * images.length + "%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-48 sm:w-72 sm:h-52 md:w-90 md:h-56 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Imagen ${(index % images.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
