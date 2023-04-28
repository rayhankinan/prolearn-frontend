import React, { useState, useEffect } from "react";
import Hero from "@/components/userCourse/courseHero";
import Sidebar from "@/components/userCourse/courseSidebar";
import CourseCards from "@/components/userCourse/courseCards";
import Course from "@/interfaces/course-interface";
import CourseService from "@/services/course-service";
import SearchBar from "@/components/adminCourse/search";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import Navbar from "@/components/navbar";
import { AuthContext } from "@/contexts/AuthContext";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [subscribedCourses, setSubscribedCourses] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
    })
      .then((response) => {
        setCourses(response.data.data);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      subscribed: true,
    })
      .then((response) => {
        const subscribedCourseId = response.data.data.map(
          (course: Course) => course.id
        );
        setSubscribedCourses(subscribedCourseId);
      })
      .catch((error) => console.log(error));
  }, [page, perPage]);

  const [difficulty, setDifficulty] = useState("All Difficulty");
  const [selected, setSelected] = useState<number[] | undefined>(undefined);
  const difficultyList = ["beginner", "intermediate", "advanced"];
  const searchQuery = (search: string) => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      difficulty: difficultyList.includes(difficulty.toLowerCase())
        ? difficulty.toLowerCase()
        : undefined,
      categoryIDs: selected,
    })
      .then((response) => {
        setCourses(response.data.data);
        setPage(1);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      difficulty: difficultyList.includes(difficulty.toLowerCase())
        ? difficulty.toLowerCase()
        : undefined,
      categoryIDs: selected,
      subscribed: true,
    })
      .then((response) => {
        const subscribedCourseId = response.data.data.map(
          (course: Course) => course.id
        );
        setSubscribedCourses(subscribedCourseId);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, difficulty, selected]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log(isLoggedIn);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
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
              href: "/course",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex flex-wrap justify-center custom-Poppins ">
        <div className="w-full md:w-1/5 px-4">
          <Sidebar
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            selected={selected}
            setSelected={setSelected}
            subscribed={subscribed}
          />
        </div>
        <div className="w-full md:w-4/5 px-4">
          <div className="flex justify-center">
            <SearchBar searchTerm={search} setSearchTerm={setSearch} />
          </div>
          <CourseCards
            courses={courses}
            subscribedCourses={subscribedCourses}
            isLoggedIn = {isLoggedIn}
          />
          <Grid container direction="row" justifyContent="center" marginTop={2}>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Grid>
        </div>
      </div>
    </>
  );
}
