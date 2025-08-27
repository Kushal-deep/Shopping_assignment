



// // App.jsx
// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Cart from "./components/Cart";
// import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import WishlistSidebar from "./components/WishlistSidebar";
// import Footer from "./components/Footer";
// import { useCart } from "./context/CartContext";

// export default function App() {
//   const { cartItems } = useCart();
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Wishlist state
//   const [wishlist, setWishlist] = useState([]);
//   const [isWishlistOpen, setIsWishlistOpen] = useState(false);

//   // 🔎 Search state
//   const [searchQuery, setSearchQuery] = useState("");

//   /** WISHLIST HELPERS **/
//   const addToWishlist = (product) => {
//     setWishlist((prev) => {
//       if (prev.some((it) => it.id === product.id)) return prev;
//       return [...prev, { ...product }];
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((it) => it.id !== id));
//   };

//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.some((it) => it.id === product.id);
//       if (exists) return prev.filter((it) => it.id !== product.id);
//       return [...prev, { ...product }];
//     });
//   };

//   return (
//     <>
//       {/* ✅ Pass search props to Header */}
//       <Header
//         cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
//         wishlistCount={wishlist.length}
//         openCart={() => setIsCartOpen(true)}
//         openWishlist={() => setIsWishlistOpen(true)}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//       <WishlistSidebar
//         isOpen={isWishlistOpen}
//         setIsOpen={setIsWishlistOpen}
//         wishlistItems={wishlist}
//         removeFromWishlist={removeFromWishlist}
//       />

//       {/* ✅ Pass searchQuery into Home */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Home
//               wishlist={wishlist}
//               toggleWishlist={toggleWishlist}
//               openCart={() => setIsCartOpen(true)}
//               openWishlist={() => setIsWishlistOpen(true)}
//               searchQuery={searchQuery} // 👈 here
//             />
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <ProductDetail
//               wishlist={wishlist}
//               toggleWishlist={toggleWishlist}
//               openCart={() => setIsCartOpen(true)}
//               openWishlist={() => setIsWishlistOpen(true)}
//             />
//           }
//         />
//       </Routes>

//       {/* <Footer /> */}
//     </>
//   );
// }









import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import WishlistSidebar from "./components/WishlistSidebar";
import { useCart } from "./context/CartContext";

export default function App() {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // 🔎 Search state (controlled & URL-synced)
  const [searchQuery, setSearchQuery] = useState("");

  /** WISHLIST HELPERS **/
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((it) => it.id === product.id)) return prev;
      return [...prev, { ...product }];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((it) => it.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((it) => it.id === product.id);
      if (exists) return prev.filter((it) => it.id !== product.id);
      return [...prev, { ...product }];
    });
  };

  return (
    <>
      {/* Header with search + cart + wishlist */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} // controlled search
      />

      {/* Cart & Wishlist */}
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <WishlistSidebar
        isOpen={isWishlistOpen}
        setIsOpen={setIsWishlistOpen}
        wishlistItems={wishlist}
        removeFromWishlist={removeFromWishlist}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              openCart={() => setIsCartOpen(true)}
              openWishlist={() => setIsWishlistOpen(true)}
              searchQuery={searchQuery} // pass controlled search
              setSearchQuery={setSearchQuery} // optional if Home wants to update URL directly
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              openCart={() => setIsCartOpen(true)}
              openWishlist={() => setIsWishlistOpen(true)}
            />
          }
        />
      </Routes>
    </>
  );
}
