import React, { useState } from "react";
import { Category } from "@/services/category-service";

type CategoryListProps = {
  categories: Category[];
  selected: number[] | undefined;
  setSelected: (selected: number[] | undefined) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, selected, setSelected}) => {
  const handleCategorySelect = (category: Category) => {
    if (selected?.includes(category.id)) {
      setSelected(selected?.filter((id) => id !== category.id));
    } else {
      setSelected([...selected ?? [], category.id]);
    }
  };

  return (
    <ul className="w-full space-y-2">
      {categories.map((category) => (
        <li
          key={category.id}
          className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
            selected?.includes(category.id)
              ? "bg-blue-500 text-white font-semibold"
              : "hover:bg-gray-200 text-slate-500 font-semibold"
          }`}
          onClick={() => handleCategorySelect(category)}
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{category.title}</span>
          </div>
            <div className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs px-1">
                {Math.floor(Math.random() * 100)}
              </span>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;