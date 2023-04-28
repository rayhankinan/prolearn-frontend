import React, { useState, useEffect } from "react";
import DifficultySelection from "@/components/userCourse/difficultySelection";
import CategoryList from "@/components/userCourse/categoryList";
import Category from "@/interfaces/category-interface";
import CategoryService from "@/services/category-service";

type SidebarProps = {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  selected: number[] | undefined;
  setSelected: (selected: number[] | undefined) => void;
  subscribed: boolean;
};
const Sidebar = ({
  difficulty,
  setDifficulty,
  selected,
  setSelected,
  subscribed,
}: SidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    if (subscribed) {
      CategoryService.getAllSubscribed()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
    } else {
      CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <div className="flex flex-col w-full px-4 py-6">
      <h4 className="text-blue-900 font-bold text-md mb-2">Difficulty</h4>
      <DifficultySelection
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <h4 className="text-blue-900 font-bold text-md mt-4 mb-2">Categories</h4>
      <div className="mt-3">
        <CategoryList
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default Sidebar;
