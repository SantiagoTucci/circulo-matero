"use client"

import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/hooks/cart-context"

interface CartProps {
  onCheckout: () => void
}

export function Cart({ onCheckout }: CartProps) {
  const { isOpen, closeCart } = useCart()

  return (
    <CartSidebar
      isOpen={isOpen}
      onClose={closeCart}
      onCheckout={() => {
        closeCart()
        onCheckout()
      }}
    />
  )
}
