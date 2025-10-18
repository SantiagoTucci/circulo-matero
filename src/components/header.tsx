import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "@/assets/logo/logo.png";
import { useCart } from "@/hooks/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Detectar si estamos en /pedido
  const isPedidoPage = location.pathname === "/pedido";

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > heroBottom - 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/pedido");
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-[var(--hero-bg-start)] shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Círculo Matero Logo"
            className={`w-10 h-10 rounded-full object-cover transition-transform duration-300 ${
              isScrolled ? "scale-95" : "scale-100"
            }`}
          />
          <a
            href="/inicio"
            className={`text-xl font-bold transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            Círculo Matero
          </a>
        </div>

        {/* Menu Desktop */}
        {!isPedidoPage && (
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#productos"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Productos
            </a>
            <a
              href="#nosotros"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Contacto
            </a>
          </nav>
        )}

        {/* Botones */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`relative transition-colors ${
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/20"
            }`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-semibold bg-white text-[var(--hero-bg-start)]">
                {totalItems}
              </span>
            )}
          </Button>

          {!isPedidoPage && (
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden transition-colors ${
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {!isPedidoPage && mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white z-50 border-t shadow-md">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <a
              href="#productos"
              className="block py-2 text-sm font-medium hover:text-primary"
            >
              Productos
            </a>
            <a
              href="#nosotros"
              className="block py-2 text-sm font-medium hover:text-primary"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="block py-2 text-sm font-medium hover:text-primary"
            >
              Contacto
            </a>
          </nav>
        </div>
      )}

      {/* Sidebar Carrito */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </header>
  );
}
