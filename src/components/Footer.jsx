import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copywrite */}
        <p className="text-sm text-gray-300">
          &copy; {year} ShopHere. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-400 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
