import React, { useState, useEffect } from "react";
import Hero from "@/pages/course/courseHero";
import Sidebar from "@/pages/course/courseSidebar";
import CourseCards from "@/pages/course/courseCards";
import { Course } from "@/services/course-service";
import CourseService from "@/services/course-service";
import Navbar from "../../components/navbar";
import SearchBar from "@/components/adminCourse/search";


export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: perPage,
    })
      .then((response) => {
        setCourses(response.data.data);
        setLength(response.data.meta.totalPage * perPage);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  }, [page, perPage]);

  
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto justify-center custom-Poppins ">
        <Hero
          title="Courses"
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Courses",
              href: "/courses",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex flex-wrap justify-center custom-Poppins ">
        <div className="w-full md:w-1/5 px-4">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5 px-4">
          <div className="flex justify-center">
            <SearchBar searchTerm={search} setSearchTerm={setSearch} />
          </div>
          <CourseCards courses={courses} />
        </div>
      </div>
    </>
  );
}
