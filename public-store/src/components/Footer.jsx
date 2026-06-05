import { Armchair, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="footer" className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white">
              <div className="grid h-8 w-8 place-items-center rounded bg-emerald-600">
                <Armchair size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight">Furniture.com</span>
            </div>
            <p className="text-sm leading-6 text-stone-400">
              Crafting premium sustainable furniture designed to bring warmth, luxury, and modern functionality to your home.
            </p>
            <div className="flex items-center gap-3 text-stone-400 mt-2">
              <a href="https://github.com" className="hover:text-emerald-500 transition" aria-label="GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://twitter.com" className="hover:text-emerald-500 transition" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://discord.com" className="hover:text-emerald-500 transition" aria-label="Discord">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Collections</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-500 transition">All Furniture</Link></li>
              <li><Link to="/" className="hover:text-emerald-500 transition">Premium Chairs</Link></li>
              <li><Link to="/" className="hover:text-emerald-500 transition">Luxury Sofas</Link></li>
              <li><Link to="/" className="hover:text-emerald-500 transition">Office & Storage</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition">FAQ & Help</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition">Shipping & Returns</a></li>
              <li><a href="http://localhost:5173" className="hover:text-emerald-500 transition">Admin Dashboard</a></li>
              <li><span className="text-stone-500">support@furniture.com</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay Connected</h3>
            <p className="text-xs text-stone-400 mb-3 leading-5">
              Subscribe to receive updates on new curated seasonal collections and special offers.
            </p>
            {subscribed ? (
              <div className="rounded bg-emerald-950/60 border border-emerald-800 px-3 py-2 text-xs text-emerald-400">
                Success! You have subscribed to our newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex">
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded bg-stone-800 border border-stone-700 px-3 py-2.5 pr-10 text-xs text-white outline-none focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  aria-label="Subscribe"
                >
                  <Mail size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="border-stone-800 my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Furniture.com Storefront. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
