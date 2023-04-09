import React, { useState, useEffect } from "react";
import Hero from "@/components/userCourse/courseHero";
import Sidebar from "@/components/userCourse/courseSidebar";
import SubscribedCards from "@/components/userCourse/subscribedCards";
import Course from "@/interfaces/course-interface";
import CourseService from "@/services/course-service";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/adminCourse/search";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import { AuthContext } from "@/contexts/AuthContext";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      subscribed: true,
    })
      .then((response) => {
        setCourses(response.data.data);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  }, [page, perPage]);

  const [difficulty, setDifficulty] = useState("All Difficulty");
  const [selected, setSelected] = useState<number[] | undefined>(undefined);

  const searchQuery = (search: string) => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      difficulty: difficulty != "All Difficulty" ? difficulty : undefined,
      categoryId: selected,
      subscribed: true,
    })
      .then((response) => {
        setCourses(response.data.data);
        setPage(1);
        setCount(response.data.meta.totalPage);
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

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="container mx-auto justify-center custom-Montserrat ">
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
      <div className="container mx-auto flex flex-wrap justify-center custom-Montserrat ">
        <div className="w-full md:w-1/5 px-4">
          <Sidebar
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="w-full md:w-4/5 px-4">
          <div className="flex justify-center">
            <SearchBar searchTerm={search} setSearchTerm={setSearch} />
          </div>
          <SubscribedCards courses={courses} />
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
