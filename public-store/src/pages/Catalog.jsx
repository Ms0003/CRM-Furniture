import { useEffect, useMemo, useState } from "react";
import { Armchair, Search } from "lucide-react";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { getAvailableProducts } from "../services/api.js";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await getAvailableProducts();
        setProducts(data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load the catalog.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category))).sort()],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Hero Banner */}
      <section className="mb-12 overflow-hidden rounded-xl border border-stone-200 bg-emerald-800 text-white shadow-soft flex flex-col md:flex-row items-center">
        <div className="p-8 md:p-12 flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded">Exquisite Collection</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">Elevate Your Living Spaces</h2>
          <p className="mt-4 text-sm md:text-base leading-7 text-emerald-100 max-w-lg">
            Discover bespoke solid wood dining tables, ergonomic office seating, and luxury lounges designed for premium comfort and sustainable style.
          </p>
        </div>
        <div className="w-full md:w-1/3 min-h-[220px] self-stretch overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop" 
            alt="Organic Living Space Display"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
        </div>
      </section>

      <section className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Live catalog</p>
          <h2 className="mt-1 text-3xl font-bold text-stone-950">Available furniture</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search catalog..."
              className="w-full rounded-md border border-stone-300 bg-white py-2 pl-10 pr-3 text-sm text-stone-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <span className="inline-flex items-center justify-center rounded-full bg-stone-100 border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          </span>
        </div>
      </section>

      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-lg border border-stone-200 bg-white px-6 py-16 text-center text-stone-500">
          Loading catalog...
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-stone-950">No matching products</h2>
          <p className="mt-2 text-sm text-stone-500">Try a different category or search term.</p>
        </div>
      )}
    </div>
  );
}

export default Catalog;
