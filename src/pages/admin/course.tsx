import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Pagination } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import CourseContext from "@/contexts/CourseContext";
//import fileService from "@/services/file-service";

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
    string | undefined
  >(undefined);
  const [selectedCategories, setSelectedCategories] = useState<
    number[] | undefined
  >(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const search = (
    searchTerm: string,
    selectedDifficulty: string | undefined,
    selectedCategories: number[] | undefined
  ) => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: searchTerm,
      difficulty: selectedDifficulty,
      categoryId: selectedCategories,
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

  const handleCategoryChange = (value: string[]) => {
    let categoryIDs: number[] = [];
    value.map((categoryTitle) => {
      let category = categories.find(
        (category) => category.title === categoryTitle
      );
      if (category != null) {
        categoryIDs.push(category.id);
      }
    });

    if (categoryIDs.length == 0) {
      setSelectedCategories(undefined);
    } else {
      setSelectedCategories(categoryIDs);
    }
  };

  const handleDifficultyChange = (value: string | null) => {
    if (value != null) {
      value = value.toLowerCase();
      setSelectedDifficulty(value?.toLowerCase());
    } else {
      setSelectedDifficulty(undefined);
    }
  };

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
        <Grid 
          sx={{ 
            width: "70%",
            margin: "0 auto",
            marginTop: "30px",
          }}
        >
          <Grid container justifyContent="space-between">
            <Typography variant="h4" className="text-4xl font-bold mt-10">
              All Courses
            </Typography>
            <img src="/logo.png" alt="Logo" className="h-12 mr-4" />
          </Grid>
          <hr className="border-t-3 border-black " />
        </Grid>
        <Container sx={{ py: 3 }} maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              direction="row"
              justify-content="space-between"
              className="mb-2"
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
            <Box sx={{ my: 2, mx: "auto", marginTop: 4 }}>
              <FilterBar
                categories={categories}
                handleDifficultyChange={handleDifficultyChange}
                handleCategoryChange={handleCategoryChange}
              />
            </Box>
            <Grid
              container
              spacing={10}
              sx={{ alignItems: "center", marginTop: 0 }}
            >
              {courses.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        card.__thumbnail__
                          ? `/api/file/${card.__thumbnail__.id}`
                          : "https://source.unsplash.com/random"
                      }
                      alt="random"
                      sx={{ height: "300px", objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="font-bold custom-Source-Code-Pro"
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        className="custom-Source-Code-Pro text-greytext"
                        sx={{
                          minHeight: "50px",
                          maxHeight: "50px",
                          overflow: "auto",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>

                    <Box
                      sx={{
                        mt: "auto",
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="caption" component="p"></Typography>
                      <Typography variant="caption" component="p">
                        {card.difficulty.toUpperCase()}
                      </Typography>
                    </Box>
                    <CardActions className="flex justify-between">
                        <Button
                          size="small"
                          variant="contained"
                          className="w-64 rounded-full bg-blackbutton text-white"
                          onClick={() => handleEdit(card.id)}
                        >
                          Edit
                        </Button>

                      <Button
                        size="small"
                        variant="contained"
                        className="w-64 rounded-full bg-redButton text-white"
                        onClick={() => handleDelete(card.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Grid item>
                <Plus handlePlusClick={handlePlusClick} />
              </Grid>

            </Grid>
          </Box>
        </Container>

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
