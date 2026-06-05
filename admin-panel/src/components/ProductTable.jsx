import { Edit2, Trash2 } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
        <h2 className="text-lg font-semibold text-stone-950">No products yet</h2>
        <p className="mt-2 text-sm text-stone-500">Add your first item to publish it to the catalog.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-stone-500">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-stone-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-stone-500">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-stone-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-stone-50">
                <td className="min-w-[320px] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-14 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-stone-950">{product.title}</p>
                      <p className="max-w-md truncate text-sm text-stone-500">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-stone-700">{product.category}</td>
                <td className="px-4 py-4 text-sm font-semibold text-stone-950">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      product.isAvailable
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {product.isAvailable ? "Available" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded-md border border-stone-300 p-2 text-stone-600 hover:border-emerald-700 hover:text-emerald-700"
                      aria-label={`Edit ${product.title}`}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      className="rounded-md border border-stone-300 p-2 text-stone-600 hover:border-red-600 hover:text-red-600"
                      aria-label={`Delete ${product.title}`}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
