import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Pagination } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "@/components/adminCourse/search";
import { Plus } from "@/components/adminCourse/plus";
import { AddCourseModal } from "@/components/adminCourse/addCourseModal";
import CourseService from "@/services/course-service";
import CategoryService from "@/services/category-service";
import Course from "@/interfaces/course-interface";
import Category from "@/interfaces/category-interface";
import FilterBar from "@/components/adminCourse/filterBar";
import { useRouter } from "next/router";
import CourseCard from "@/components/adminCourse/courseCard";
import Hero from "@/components/adminCourse/courseHero";
import Sidebar from "@/components/userCourse/courseSidebar";

const theme = createTheme();

export default function Album() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>(1);
  const [length, setLength] = useState(0);
  const [count, setCount] = useState(0);
  const [perPage, setperPage] = useState(6);
  let [page, setPage] = React.useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    string
  >("All Difficulty");
  const [selectedCategories, setSelectedCategories] = useState<
    number[] | undefined
  >(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: searchTerm,
    })
      .then((response) => {
        setCourses(response.data.data);
        setLength(response.data.meta.totalPage * perPage);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  }, [page, perPage]);

  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const difficultyList = ["beginner", "intermediate", "advanced"];

  const search = (
    searchTerm: string,
    selectedDifficulty: string | undefined,
    selectedCategories: number[] | undefined
  ) => {
    
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: searchTerm,
      difficulty: difficultyList.includes(selectedDifficulty!.toLowerCase())
      ? selectedDifficulty!.toLowerCase()
      : undefined,
      categoryIDs: selectedCategories,
    })
      .then((response) => {
        setCourses(response.data.data);
        setPage(1);
        setLength(response.data.meta.totalPage * perPage);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search(searchTerm, selectedDifficulty, selectedCategories);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedDifficulty, selectedCategories]);

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (courseId?: number) => {
    if (courseId) {
      setSelectedId(courseId);

      router.push(`/admin/course/${courseId}/description`);
    }
  };

  const handleModalSubmit = (course: Course) => {
    if (course.imgFile == null) {
      alert("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("difficulty", course.difficulty);
    formData.append("status", course.status);
    for (let i = 0; i < course.__categories__.length; i++) {
      formData.append("categoryIDs[]", course.__categories__[i].toString());
    }
    formData.append("file", course.imgFile, course.imgFile.name);
    CourseService.create(formData)
      .then((newCourse) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setperPage(6);
    } else {
      setperPage(length * count);
    }
  };

  const handleDelete = async (id?: number) => {
    if (id == null) {
      return;
    }
    try {
      await CourseService.delete(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  let pagination;
  let rightButton;
  let leftButton;

  if (showAll) {
    pagination = null;
    rightButton = (
      <Button
        component={Link}
        href="#"
        underline="none"
        onClick={handlePlusClick}
      >
        <Typography className="text-s font-bold text-black">
          Add Course
        </Typography>
      </Button>
    );
    leftButton = (
      <Button
        component={Link}
        href="#"
        underline="none"
        onClick={handleShowAll}
      >
        <Typography className="text-s font-bold text-black">
          View Less Courses
        </Typography>
      </Button>
    );
  } else {
    pagination = (
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    );
    rightButton = (
      <Button
        component={Link}
        href="#"
        underline="none"
        onClick={handleShowAll}
      >
        <Typography className="text-s font-bold text-black">
          View All Courses
        </Typography>
      </Button>
    );
    leftButton = null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
      <Hero
          title="Edit Courses"
          breadcrumbs={[
          ]}
        />
        <div className = "container mx-auto">
              <Grid
                container
                direction="row"
                justify-content="space-between"
                className="mb-2 px-3"
              >
                <Grid container>
                  <Grid
                    container
                    item
                    xs={0}
                    sm={0}
                    md={4}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {leftButton}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingBottom={4}
                  >
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={12}
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      {rightButton}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className="container w-full flex justify-center custom-Poppins ">
              <div className="w-full md:w-1/5 px-4">
                  <Sidebar
                  difficulty={selectedDifficulty!}
                  setDifficulty={setSelectedDifficulty}
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                  />
                </div>
                <div className="w-full md:w-4/5 px-4">
                  <Grid container spacing={3}>
                    {courses.map((card) => (
                      <Grid item key={card.id} xs={12} md={6} lg ={4}>
                        <CourseCard
                          course={card}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      </Grid>
                    ))}
                    <Grid item>
                      <Plus handlePlusClick={handlePlusClick} />
                    </Grid>
                  </Grid>
                </div>
              </div>
        </div>

        <Grid container direction="row" justifyContent="center" marginTop={2}>
          {pagination}
        </Grid>

        <AddCourseModal
          open={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          categories={categories}
        />
      </main>
    </ThemeProvider>
  );
}
