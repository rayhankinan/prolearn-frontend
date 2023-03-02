import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Course } from "@/services/course-service";
import CourseCard from "@/pages/user/courseCard";
import { Chip } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="w-1/4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Course Categories</div>
          <div className="mt-4 flex flex-wrap">
            <Chip label="All" className="mr-2 mb-2" />
            <Chip label="Web Development" className="mr-2 mb-2" />
            <Chip label="Mobile Development" className="mr-2 mb-2" />
            <Chip label="Data Science" className="mr-2 mb-2" />
            <Chip label="Design" className="mr-2 mb-2" />
            <Chip label="Business" className="mr-2 mb-2" />
            <Chip label="IT & Software" className="mr-2 mb-2" />
            <Chip label="Marketing" className="mr-2 mb-2" />
            <Chip label="Personal Development" className="mr-2 mb-2" />
            </div>
          </div>
        </div>
      </div>
  );
};


export default Sidebar