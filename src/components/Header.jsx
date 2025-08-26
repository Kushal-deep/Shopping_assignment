import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";

export default function Header({ cartCount }) {
  const [search, setSearch] = useState("");

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-red-700 via-black to-black shadow-lg sticky top-0 z-50"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-3xl font-extrabold text-white cursor-pointer mb-2 sm:mb-0"
      >
        ShopLogo
      </motion.div>

      {/* Search */}
      <div className="relative w-full sm:w-96 mx-auto mb-2 sm:mb-0">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full py-2 pl-10 pr-4 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Cart & Profile */}
      <div className="flex items-center gap-4">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer"
        >
          <ShoppingCart className="text-white hover:text-red-500 transition" size={28} />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer"
        >
          <User className="text-white hover:text-red-500 transition" size={28} />
        </motion.div>
      </div>
    </motion.header>
  );
}
