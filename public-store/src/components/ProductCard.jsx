import { ImageOff, Tag } from "lucide-react";
import { useState } from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
      <div className="aspect-[4/3] bg-stone-100">
        {imageFailed ? (
          <div className="flex h-full items-center justify-center text-stone-400">
            <ImageOff size={34} />
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.title}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <Tag size={13} />
              {product.category}
            </p>
            <h2 className="mt-3 text-lg font-semibold text-stone-950">{product.title}</h2>
          </div>
          <p className="text-lg font-semibold text-stone-950">{formatCurrency(product.price)}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-stone-600">{product.description}</p>
      </div>
    </article>
  );
}

export default ProductCard;
