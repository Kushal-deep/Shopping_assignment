

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Cart({ isOpen, setIsOpen }) {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleContinueShopping = () => {
    setIsOpen(false);
    navigate("/"); // 🔥 redirect to home
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[999]" // overlay above header
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl z-[1000] overflow-y-auto" // 🔥 sidebar above header
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                  <p className="text-gray-400 text-lg">Your cart is empty 🛒</p>
                  <button
                    onClick={handleContinueShopping}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold truncate">
                        {item.title}
                      </h3>

                      {/* Original price (strikethrough) + Discounted price */}
                      <p className="text-sm">
                        <span className="text-gray-500 line-through mr-2">
                          ${(item.price * 1.2).toFixed(2)}
                        </span>
                        <span className="text-green-400 font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} className="text-red-400 hover:text-white"/>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Coupon + Totals (only if cart has items) */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-700 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    Apply
                  </button>
                </div>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

