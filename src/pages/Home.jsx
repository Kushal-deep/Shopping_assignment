



import { useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import { products } from "../Sampledata";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Home({ wishlist, toggleWishlist, openCart, openWishlist }) {
  const { cartItems, addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const categoryParam = searchParams.get("category") || "";
  const priceParam = searchParams.get("price") || "50000";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? categoryParam.split(",") : []);
  const [priceRange, setPriceRange] = useState(parseInt(priceParam));
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Update URL whenever filters/search change
  const updateFilters = (categories, price, search) => {
    const params = new URLSearchParams();
    if (categories.length > 0) params.set("category", categories.join(","));
    params.set("price", price);
    if (search) params.set("search", search);
    setSearchParams(params);
  };

  // ✅ Sync state with URL on mount & URL change
  useEffect(() => {
    setSelectedCategories(categoryParam ? categoryParam.split(",") : []);
    setPriceRange(parseInt(priceParam));
    setSearchQuery(searchParam);
  }, [categoryParam, priceParam, searchParam]);

  // ✅ Update URL when search changes
  useEffect(() => {
    updateFilters(selectedCategories, priceRange, searchQuery);
  }, [searchQuery]);

  // Filter products
  const filteredProducts = products.filter(
    (p) =>
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      p.price <= priceRange &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-6">
        <SidebarFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={(cats) => {
            setSelectedCategories(cats);
            updateFilters(cats, priceRange, searchQuery);
          }}
          priceRange={priceRange}
          setPriceRange={(price) => {
            setPriceRange(price);
            updateFilters(selectedCategories, price, searchQuery);
          }}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isInCart = cartItems.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-gradient-to-t from-indigo-800 via-purple-800 to-indigo-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-48 object-contain bg-white/5"
                      />
                    </Link>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                      <p className="text-gray-300 mb-2 text-sm">{product.description.slice(0, 60)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-bold">₹{product.price}</span>
                        {isInCart ? (
                          <button
                            disabled
                            className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium cursor-default"
                          >
                            Item Added
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium transition"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-20 text-lg">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
