import React, { useState, useEffect } from "react";
import DifficultySelection from "@/components/userCourse/difficultySelection";
import CategoryList from "@/components/userCourse/categoryList";
import { Category } from "@/services/category-service";
import CategoryService from "@/services/category-service";

const Sidebar = () => {
  //get all categories

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <div className="flex flex-col w-full px-4 py-6">
      <h4 className="text-blue-900 font-bold text-md mb-2">Difficulty</h4>
      <DifficultySelection />
      <h4 className="text-blue-900 font-bold text-md mt-4 mb-2">Categories</h4>
      <div className="mt-3">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default Sidebar;
