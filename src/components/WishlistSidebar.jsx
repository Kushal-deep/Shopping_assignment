import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function WishlistSidebar({ isOpen, setIsOpen, wishlistItems, removeFromWishlist }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full sm:w-96 h-full bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white shadow-2xl z-50 p-6 flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Wishlist ❤️</h2>
            <X
              size={24}
              className="cursor-pointer hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Wishlist items */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {wishlistItems.length === 0 ? (
              <div className="text-center mt-10 flex flex-col items-center gap-4">
                <p className="text-gray-300">Wishlist is empty</p>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/10 rounded-xl p-3 flex gap-3 items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="text-yellow-400 font-bold text-lg">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Delete Icon */}
                  <Trash2
                    size={20}
                    className="text-red-500 hover:text-red-400 cursor-pointer"
                    onClick={() => removeFromWishlist(item.id)}
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
