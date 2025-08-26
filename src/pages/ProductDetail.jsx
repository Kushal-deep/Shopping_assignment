


// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { products } from "../Sampledata";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// // Sample reviews
// const reviews = [
//   { id: 1, username: "Alice", rating: 5, comment: "Amazing product! Highly recommend it." },
//   { id: 2, username: "Bob", rating: 4, comment: "Very good quality, but shipping was slow." },
//   { id: 3, username: "Charlie", rating: 3, comment: "Decent product, expected better packaging." },
//   { id: 4, username: "Diana", rating: 5, comment: "Absolutely love it!" },
// ];

// export default function ProductDetail() {
//   const { id } = useParams(); // get product ID from URL
//   const product = products.find((p) => p.id === parseInt(id));

//   const [quantity, setQuantity] = useState(1);

//   const addToCart = () => {
//     console.log("Add to cart:", product.title, quantity);
//   };

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Product not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white flex flex-col">
//       <Header cartCount={0} />

//       <main className="flex flex-col lg:flex-row gap-8 p-6 flex-1">
//         {/* Image Section */}
//         <div className="flex-1 flex justify-center items-center bg-white/5 rounded-xl p-4">
//           <img
//             src={product.images[0]}
//             alt={product.title}
//             className="max-h-[400px] object-contain"
//           />
//         </div>

//         {/* Details Section */}
//         <div className="flex-1 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <span className="text-yellow-400 text-2xl font-semibold">
//             ₹{product.price}
//           </span>
//           <p className="text-gray-300">{product.description}</p>
//           <p className="text-gray-400">
//             <span className="font-semibold">Category:</span> {product.category}
//           </p>

//           {/* Quantity Selector */}
//           <div className="flex items-center gap-4 mt-4">
//             <button
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               className="bg-gray-700 px-3 py-1 rounded-full text-lg hover:bg-gray-600 transition"
//             >
//               -
//             </button>
//             <span className="text-lg">{quantity}</span>
//             <button
//               onClick={() => setQuantity((q) => q + 1)}
//               className="bg-gray-700 px-3 py-1 rounded-full text-lg hover:bg-gray-600 transition"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={addToCart}
//             className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-full mt-4 text-lg font-semibold transition w-max"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </main>

//       {/* Reviews Section */}
//       <section className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Reviews</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {reviews.map((rev) => (
//             <div
//               key={rev.id}
//               className="bg-white/10 p-4 rounded-lg shadow-md flex flex-col gap-2"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-white">{rev.username}</span>
//                 <span className="text-yellow-400">
//                   {"★".repeat(rev.rating) + "☆".repeat(5 - rev.rating)}
//                 </span>
//               </div>
//               <p className="text-gray-200 text-sm">{rev.comment}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../Sampledata";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Sample reviews
const reviews = [
  { id: 1, username: "Alice", rating: 5, comment: "Amazing product! Highly recommend it." },
  { id: 2, username: "Bob", rating: 4, comment: "Very good quality, but shipping was slow." },
  { id: 3, username: "Charlie", rating: 3, comment: "Decent product, expected better packaging." },
  { id: 4, username: "Diana", rating: 5, comment: "Absolutely love it!" },
];

export default function ProductDetail() {
  const { id } = useParams(); // get product ID from URL
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const addToCart = () => {
    console.log("Add to cart:", product.title, quantity);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found.
      </div>
    );
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white flex flex-col">
      <Header cartCount={0} />

      <main className="flex flex-col lg:flex-row gap-8 p-6 flex-1">
        {/* Image Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-xl p-4 relative">
          {/* Carousel Image */}
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="max-h-[400px] object-contain rounded-lg"
          />

          {/* Carousel Buttons */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                ▶
              </button>
            </>
          )}

          {/* Image indicators */}
          <div className="flex gap-2 mt-4">
            {product.images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentImage === index ? "bg-yellow-400" : "bg-white/50"
                }`}
              ></span>
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

          {/* Add to Cart */}
          <button
            onClick={addToCart}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-full mt-4 text-lg font-semibold transition w-max"
          >
            Add to Cart
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
                <span className="font-semibold text-white">{rev.username}</span>
                <span className="text-yellow-400">
                  {"★".repeat(rev.rating) + "☆".repeat(5 - rev.rating)}
                </span>
              </div>
              <p className="text-gray-200 text-sm">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
