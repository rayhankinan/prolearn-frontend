import React, { useState } from "react";
import { Category } from "@/services/category-service";

type CategoryListProps = {
  categories: Category[];

};

const CategoryList: React.FC<CategoryListProps> = ({
  categories
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleCategorySelect = (category: Category) => {
    if (selected.includes(category.id)) {
      setSelected(selected.filter((id) => id !== category.id));
    } else {
      setSelected([...selected, category.id]);
    }
  };

  return (
    <ul className="w-full space-y-2">
      {categories.map((category) => (
        <li
          key={category.id}
          className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
            selected.includes(category.id)
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handleCategorySelect(category)}
        >
          <span className="mr-2">{category.title}</span>
          {selected.includes(category.id) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm3.27 7.73a.75.75 0 0 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 0 1 1.06-1.06l.97.97 2.97-2.97z"
              />
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
