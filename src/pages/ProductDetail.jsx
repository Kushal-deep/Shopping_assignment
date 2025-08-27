


import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../Sampledata";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight, Truck, RefreshCw, Zap } from "lucide-react";
import Footer from "../components/Footer";

const reviews = [
  { id: 1, username: "Alice", rating: 5, comment: "Amazing product! Highly recommend it." },
  { id: 2, username: "Bob", rating: 4, comment: "Very good quality, but shipping was slow." },
  { id: 3, username: "Charlie", rating: 3, comment: "Decent product, expected better packaging." },
  { id: 4, username: "Diana", rating: 5, comment: "Absolutely love it!" },
];

// ⭐ Function to render stars (supports halves)
function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars).fill(0).map((_, i) => (
        <span key={"full" + i} className="text-yellow-400 text-xl">★</span>
      ))}
      {halfStar && <span className="text-yellow-400 text-xl">☆</span>}
      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={"empty" + i} className="text-gray-500 text-xl">★</span>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const { cartItems, addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found.
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product, quantity);
    }
  };

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white flex flex-col">
      <main className="flex flex-col lg:flex-row gap-8 p-6 flex-1">
        {/* Image Section (Carousel) */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-xl p-4 relative">
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="max-h-[400px] object-contain rounded-lg"
          />

          {/* Prev/Next buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight className="text-white" />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setCurrentImage(idx)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  idx === currentImage
                    ? "border-yellow-400"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <span className="text-yellow-400 text-2xl font-semibold">
            ₹{product.price}
          </span>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-gray-400">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          {/* ⭐ Ratings above quantity */}
          <RatingStars rating={product.rating || 4.5} />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="bg-gray-700 px-3 py-1 rounded-full text-lg hover:bg-gray-600 transition"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="bg-gray-700 px-3 py-1 rounded-full text-lg hover:bg-gray-600 transition"
            >
              +
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg">
              <Truck className="text-yellow-400" />
              <p className="text-sm">Free shipping on orders above ₹399</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg">
              <RefreshCw className="text-green-400" />
              <p className="text-sm">Easy Exchange</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg">
              <Zap className="text-blue-400" />
              <p className="text-sm">Fast Delivery</p>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`px-6 py-2 rounded-full mt-4 text-lg font-semibold transition w-max ${
              isInCart
                ? "bg-green-500 text-white cursor-default"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
          >
            {isInCart ? "Item Added" : "Add to Cart"}
          </button>
        </div>
      </main>

      {/* Reviews Section */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/10 p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">
                  {rev.username}
                </span>
                <span className="text-yellow-400">
                  {"★".repeat(rev.rating) + "☆".repeat(5 - rev.rating)}
                </span>
              </div>
              <p className="text-gray-200 text-sm">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
}
