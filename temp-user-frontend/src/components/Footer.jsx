import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-pink-100 via-pink-200 to-pink-300 text-gray-800 border-t border-pink-300  w-full mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-pink-700 flex items-center gap-2">
            Temptation <span role="img" aria-label="ice cream">🍦</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Serving happiness one scoop at a time.<br />
            <span className="font-medium">Scoop it. Love it. Repeat.</span>
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-pink-700 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-700 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-pink-700 transition"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-800 transition">Home</a></li>
            <li><a href="#" className="hover:text-pink-800 transition">Menu</a></li>
            <li><a href="#" className="hover:text-pink-800 transition">Offers</a></li>
            <li><a href="#" className="hover:text-pink-800 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700 mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-pink-700" /> Juhu, Mumbai, India</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-pink-700" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MessageCircle size={16} className="text-pink-700" /> WhatsApp</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-pink-700" /> support@temptation.com</li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700 mb-3">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon–Fri: <span className="font-medium">11AM–11PM</span></li>
            <li>Sat–Sun: <span className="font-medium">12PM–12AM</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-300 py-4 text-center text-sm bg-pink-50">
        <p>
          © 2025 <span className="font-semibold">Temptation Ice Cream Hub</span> | Built with 
          <span className="text-pink-600 inline-flex items-center mx-1">
            <Heart size={14} className="fill-pink-600" />
          </span>
          by <span className="font-medium text-pink-700">Sameer Wadekar</span>
        </p>
      </div>
    </footer>
  );
}
