import { Link } from "react-router-dom";
import { Armchair, LogOut, User, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-emerald-700 text-white transition-all group-hover:bg-emerald-800">
              <Armchair size={22} className="transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-950">Furniture.com</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Store</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition">
              Catalog
            </Link>
            <a href="#footer" className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition">
              About
            </a>
            <span className="h-4 w-px bg-stone-200"></span>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-stone-700 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200">
                  <User size={15} className="text-emerald-700" />
                  <span className="font-medium max-w-[120px] truncate">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition shadow-sm"
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-stone-700 hover:text-emerald-700 transition px-3 py-1.5"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-3 shadow-inner">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-700 hover:text-emerald-700"
          >
            Catalog
          </Link>
          <a
            href="#footer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-stone-700 hover:text-emerald-700"
          >
            About
          </a>
          <hr className="border-stone-200" />
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-stone-700">
                <User size={16} className="text-emerald-700" />
                <span className="font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center block rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
