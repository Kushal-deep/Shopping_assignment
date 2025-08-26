import { useState } from "react";
import Header from "../components/Header";
import SidebarFilters from "../components/SidebarFilters";
import { products } from "../Sampledata";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for tablet/mobile

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(p.category)) &&
      p.price <= priceRange
  );

  const addToCart = (product) => setCart((prev) => [...prev, product]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1F1F] via-[#2B0A0A] to-[#000000] text-white">
      {/* Header */}
      <Header cartCount={cart.length} toggleSidebar={() => setSidebarOpen(true)} />

      {/* Main content */}
      <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-6">
        {/* Sidebar */}
        <SidebarFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#2C2C2C] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                    <p className="text-gray-300 mb-2 text-sm">
                      {product.description.slice(0, 60)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#E63946] font-bold">
                        ₹{product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-[#E63946] hover:bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-20 text-lg">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
