import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

const emptyProduct = {
  title: "",
  category: "Bed",
  description: "",
  price: "",
  imageUrl: "",
  isAvailable: true,
};

const categories = ["Bed", "Chair", "Table", "Sofa", "Storage", "Decor"];

function ProductFormModal({ isOpen, onClose, onSubmit, product, isSaving }) {
  const [formData, setFormData] = useState(emptyProduct);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        category: product.category || "Bed",
        description: product.description || "",
        price: product.price ?? "",
        imageUrl: product.imageUrl || "",
        isAvailable: Boolean(product.isAvailable),
      });
      return;
    }

    setFormData(emptyProduct);
  }, [product, isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-950">
              {product ? "Edit product" : "Add product"}
            </h2>
            <p className="text-sm text-stone-500">Catalog changes save directly to MongoDB.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            aria-label="Close product form"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 px-5 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-stone-700">
              Title
              <input
                required
                name="title"
                value={formData.title}
                onChange={updateField}
                placeholder="Wooden King Bed"
                className="rounded-md border border-stone-300 px-3 py-2.5 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-stone-700">
              Category
              <select
                name="category"
                value={formData.category}
                onChange={updateField}
                className="rounded-md border border-stone-300 px-3 py-2.5 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium text-stone-700">
            Description
            <textarea
              required
              name="description"
              rows="4"
              value={formData.description}
              onChange={updateField}
              placeholder="Solid wood frame with soft upholstered headboard..."
              className="resize-none rounded-md border border-stone-300 px-3 py-2.5 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <label className="grid gap-1.5 text-sm font-medium text-stone-700">
              Price
              <input
                required
                min="0"
                step="0.01"
                type="number"
                name="price"
                value={formData.price}
                onChange={updateField}
                placeholder="899"
                className="rounded-md border border-stone-300 px-3 py-2.5 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-stone-700">
              Image URL
              <input
                required
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={updateField}
                placeholder="https://images.unsplash.com/..."
                className="rounded-md border border-stone-300 px-3 py-2.5 text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={updateField}
              className="h-4 w-4 accent-emerald-700"
            />
            Available in public catalog
          </label>

          <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              <Check size={17} />
              {isSaving ? "Saving..." : "Save product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
