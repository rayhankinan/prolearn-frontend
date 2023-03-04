import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Course } from "@/services/course-service";
import CourseCard from "@/components/userCourse/courseCard";
import { Chip } from "@mui/material";
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

      <h3 className="text-blue-900 font-bold text-lg mb-4">DIFFICULTY</h3>
      <DifficultySelection />
      <div className="mt-7">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default Sidebar;
