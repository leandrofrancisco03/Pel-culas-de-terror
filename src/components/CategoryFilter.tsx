import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button
        className={`px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded ${
          selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded ${
            selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;