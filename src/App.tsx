import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "@/pages/index";
import { CheckoutForm } from "@/components/checkout-form";
import { CartProvider } from "@/hooks/cart-context";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/pedido" element={<CheckoutFormWrapper />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

function CheckoutFormWrapper() {
  const navigate = useNavigate();

  return <CheckoutForm onBack={() => navigate(-1)} />;
}

export default App;
