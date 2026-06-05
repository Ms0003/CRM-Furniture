import { useEffect, useMemo, useState } from "react";
import { Armchair, LogOut, Plus, RefreshCw } from "lucide-react";
import ProductFormModal from "../components/ProductFormModal.jsx";
import ProductTable from "../components/ProductTable.jsx";
import { useAuth } from "../context/authContext.jsx";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/api.js";

function Dashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const stats = useMemo(
    () => ({
      total: products.length,
      available: products.filter((product) => product.isAvailable).length,
      categories: new Set(products.map((product) => product.category)).size,
    }),
    [products]
  );

  const loadProducts = async () => {
    setError("");
    setIsLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSave = async (payload) => {
    setError("");
    setIsSaving(true);

    try {
      if (selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct._id, payload);
        setProducts((current) =>
          current.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
        );
      } else {
        const createdProduct = await createProduct(payload);
        setProducts((current) => [createdProduct, ...current]);
      }

      closeModal();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.title}" from the catalog?`);

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await deleteProduct(product._id);
      setProducts((current) => current.filter((item) => item._id !== product._id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete product.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f4]">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-emerald-700 text-white">
              <Armchair size={22} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-stone-950">Furniture CMS</h1>
              <p className="text-sm text-stone-500">{user?.name || "Admin"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadProducts}
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
              title="Refresh products"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
              title="Sign out"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Catalog manager</p>
            <h2 className="mt-1 text-3xl font-semibold text-stone-950">Products</h2>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <Plus size={18} />
            Add product
          </button>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <p className="text-sm text-stone-500">Total products</p>
            <p className="mt-1 text-2xl font-semibold text-stone-950">{stats.total}</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <p className="text-sm text-stone-500">Available</p>
            <p className="mt-1 text-2xl font-semibold text-stone-950">{stats.available}</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <p className="text-sm text-stone-500">Categories</p>
            <p className="mt-1 text-2xl font-semibold text-stone-950">{stats.categories}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg border border-stone-200 bg-white px-6 py-14 text-center text-stone-500">
            Loading products...
          </div>
        ) : (
          <ProductTable products={products} onEdit={openEditModal} onDelete={handleDelete} />
        )}
      </section>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        product={selectedProduct}
        isSaving={isSaving}
      />
    </main>
  );
}

export default Dashboard;
