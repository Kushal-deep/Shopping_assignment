



// // Header.jsx
// import { motion } from "framer-motion";
// import { ShoppingCart, User, Search } from "lucide-react";

// export default function Header({ cartCount, openCart, searchQuery, setSearchQuery }) {
//   return (
//     <motion.header
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 shadow-lg sticky top-0 z-50"
//     >
//       {/* Logo */}
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         className="text-3xl font-extrabold text-white cursor-pointer mb-2 sm:mb-0"
//       >
//         Shop<span className="text-red-500">Here</span>
//       </motion.div>

//       {/* ✅ Controlled Search */}
//       <div className="relative w-full sm:w-96 mx-auto mb-2 sm:mb-0">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full rounded-full py-2 pl-10 pr-4 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
//         />
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//       </div>

//       {/* Cart & Profile */}
//       <div className="flex items-center gap-4">
//         <motion.div onClick={openCart}
//           whileTap={{ scale: 0.9 }}
//           className="relative cursor-pointer"
//         >
//           <ShoppingCart className="text-white hover:text-yellow-400 transition" size={28} />
//           {cartCount > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5"
//             >
//               {cartCount}
//             </motion.span>
//           )}
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
//           <User className="text-white hover:text-yellow-400 transition" size={28} />
//         </motion.div>
//       </div>
//     </motion.header>
//   );
// }




// Header.jsx
// import { motion } from "framer-motion";
// import { ShoppingCart, User, Search } from "lucide-react";

// export default function Header({ cartCount, openCart, searchQuery, setSearchQuery }) {
//   return (
//     <motion.header
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 shadow-lg sticky top-0 z-50"
//     >
//       {/* Logo */}
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         className="text-3xl font-extrabold text-white cursor-pointer mb-2 sm:mb-0"
//       >
//         Shop<span className="text-red-500">Here</span>
//       </motion.div>

//       {/* Controlled Search */}
//       <div className="relative w-full sm:w-96 mx-auto mb-2 sm:mb-0">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full rounded-full py-2 pl-10 pr-4 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
//         />
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//       </div>

//       {/* Cart & Profile */}
//       <div className="flex items-center gap-4">
//         <motion.div onClick={openCart} whileTap={{ scale: 0.9 }} className="relative cursor-pointer">
//           <ShoppingCart className="text-white hover:text-yellow-400 transition" size={28} />
//           {cartCount > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5"
//             >
//               {cartCount}
//             </motion.span>
//           )}
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
//           <User className="text-white hover:text-yellow-400 transition" size={28} />
//         </motion.div>
//       </div>
//     </motion.header>
//   );
// }




import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Header({ cartCount, openCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 shadow-lg sticky top-0 z-50"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-3xl font-extrabold text-white cursor-pointer mb-2 sm:mb-0"
      >
        Shop<span className="text-red-500">Here</span>
      </motion.div>

      {/* Controlled Search synced with URL */}
      <div className="relative w-full sm:w-96 mx-auto mb-2 sm:mb-0">
        <input
          type="text"
          placeholder="Search products..."
          value={searchParam}
          onChange={handleSearchChange}
          className="w-full rounded-full py-2 pl-10 pr-4 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Cart & Profile */}
      <div className="flex items-center gap-4">
        <motion.div onClick={openCart} whileTap={{ scale: 0.9 }} className="relative cursor-pointer">
          <ShoppingCart className="text-white hover:text-yellow-400 transition" size={28} />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
          <User className="text-white hover:text-yellow-400 transition" size={28} />
        </motion.div>
      </div>
    </motion.header>
  );
}
