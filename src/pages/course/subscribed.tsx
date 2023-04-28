import React, { useState, useEffect } from "react";
import Hero from "@/components/userCourse/courseHero";
import Sidebar from "@/components/userCourse/courseSidebar";
import SubscribedCards from "@/components/userCourse/subscribedCards";
import RecommendCards from "@/components/userCourse/recommendCards";
import Course from "@/interfaces/course-interface";
import CourseService from "@/services/course-service";
import RecommendService from "@/services/recommend-service";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/adminCourse/search";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import { AuthContext } from "@/contexts/AuthContext";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [recommendCourse, setRecommendCourse] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [recommPage, setRecommPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [perRecommPage, setPerRecommPage] = useState(3);
  const [count, setCount] = useState(1);
  const [recommCount, setRecommCount] = useState(1);
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
    
    RecommendService.getRecommendation()
    .then((response) => {
      console.log(response.data.data)
      setRecommendCourse(response.data.data);
      setRecommPage(1);
      setRecommCount(response.data.meta.totalPage);
    })
    .catch((error) => console.log(error));
  }, [page, perPage, recommPage, perRecommPage]);

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

  const handleRecommChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setRecommPage(value);
  }

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
              label: "My Courses",
              href: "/course/subscribed",
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
          <div className="flex flex-col mt-4">
            <div className="text-xl custom-Poppins pl-5">
              {">"} Recommended Courses for You
            </div>
            <div className="bg-gray-300 p-5 rounded-lg shadow-lg">
              <RecommendCards recommendCourses={recommendCourse} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
