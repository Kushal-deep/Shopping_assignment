import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { products } from "../Sampledata";

export default function SidebarFilters({
  selectedCategories = [],
  setSelectedCategories,
  priceRange,
  setPriceRange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [...new Set(products.map((p) => p.category))];

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex justify-end p-4">
        <Menu
          size={28}
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-red-700 via-black to-black text-white z-50 p-6 shadow-lg flex flex-col"
          >
            <div className="flex justify-end mb-4">
              <X
                size={24}
                className="cursor-pointer hover:text-red-400"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Categories */}
            <h3 className="text-red-400 font-bold mb-2">Categories</h3>
            <div className="flex flex-col gap-2 mb-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategories.includes(cat)
                      ? "bg-red-600 border-red-600"
                      : "border-gray-700 hover:bg-gray-800"
                  } text-left`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Price Range */}
            <h3 className="text-red-400 font-bold mb-2 flex justify-between items-center">
              Price: <span>₹{priceRange}</span>
            </h3>
            <input
              type="range"
              min="0"
              max="50000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full mb-4 accent-red-600"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex sm:flex-col w-64 h-screen bg-gradient-to-b from-red-700 via-black to-black text-white p-6 border-r border-gray-800">
        <h3 className="text-red-400 font-bold mb-4 text-xl">Filters</h3>

        {/* Categories */}
        <h4 className="text-red-400 font-semibold mb-2">Categories</h4>
        <div className="flex flex-col gap-2 mb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => toggleCategory(cat)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full border ${
                selectedCategories.includes(cat)
                  ? "bg-red-600 border-red-600"
                  : "border-gray-700 hover:bg-gray-800"
              } text-left`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Price Range */}
        <h4 className="text-red-400 font-semibold mb-2 flex justify-between items-center">
          Price: <span>₹{priceRange}</span>
        </h4>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-red-600"
        />
      </div>
    </>
  );
}
