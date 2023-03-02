import React, { useState, useEffect } from "react";
import Hero from "@/pages/user/courseHero";
import Sidebar from "@/pages/user/courseSidebar";
import CourseCards from "@/pages/user/courseCards";
import { Course } from "@/services/course-service";
import CourseService from "@/services/course-service";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(0);

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
    <div className="container mx-auto justify-center">
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
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full md:w-1/4 px-4">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <CourseCards courses={courses} />
        </div>
      </div>
    </>
  );
}
