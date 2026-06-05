function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
