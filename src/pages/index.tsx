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
import SearchBar from "@/components/search";
import { Plus } from "@/components/plus";
import { AddCourseModal } from "@/components/addCourseModal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CourseService from "@/services/course-service";
import { Course } from "@/services/course-service";
import CategoryService from "@/services/category-service";
import { Category } from "@/services/course-service";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const theme = createTheme();

export default function Album() {
  const [length, setLength] = useState(0);
  const [count , setCount] = useState(0);
  let PERPAGE = 6;
  let [page, setPage] = React.useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const APINEMBAK = "/api/file"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    ""
  );
  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: PERPAGE,
      title: searchTerm,
      
    })
      .then((response) => {
        console.log(response.data.data);
        setCourses(response.data.data);
        setLength(response.data.meta.totalPage * PERPAGE);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
      CategoryService.getAll()
        .then((response) => {
          console.log(response.data.data);
          setCategories(response.data.data);
        })
        .catch((error) => console.log(error));
    }, []);


  const search = (searchTerm: string) => {
    CourseService.getAll({
      page: 1,
      limit: 6,
      title: searchTerm
    })
      .then((response) => {
        console.log(response.data.data);
        setCourses(response.data.data);
        setPage(1)
        setLength(response.data.meta.totalPage * PERPAGE);
        setCount(response.data.meta.totalPage);
        
        
      })
      .catch((error) => console.log(error));
  };

  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn); 
  }, [searchTerm, selectedDifficulty]);
  
   const handleCategoryChange = (
     event: React.SyntheticEvent<Element, Event>,
     value: string
   ) => {
     // handle category change here
   };

   const handleDifficultyChange = (
     value: string| null
   ) => {
     setSelectedDifficulty(value);
   };

  const [showAll, setShowAll] = useState(false);
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

const handleModalSubmit = (course: Course) => {
  //add course to setCourses
  if(course.imgFile == null){
    alert("Please upload an image");
    return;
  }
  const formData = new FormData();
  console.log("disini kontol")
  console.log(course.imgFile)
  formData.append("title", course.title);
  formData.append("description", course.description);
  formData.append("difficulty", course.difficulty);
  formData.append("status", course.status);
  for (let i = 0; i < course.__categories__.length; i++) {
    formData.append("categoryIDs[]" , course.__categories__[i].toString());
  }
  formData.append("file", course.imgFile, course.imgFile.name);

  CourseService.create(formData)
    .then((newCourse) => {
      console.log(newCourse);

      //sementara reload dulu karena aing stres
      
      window.location.reload();
      
    
    })
    .catch((error) => {
      console.error(error);
    });
};

  

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

    setPage(value);


  };


  //view all course button is clicked, show all courses remove pagination

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  


  let pagination;
  let rightButton;
  let leftButton;
  let leftButton2;

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


    leftButton = (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories.map((category) => category.title)}
        sx={{ width: 150, height: 10, marginRight: 2 }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
    );
    leftButton2 = (
      <Autocomplete
        disablePortal
        id="combo-box-demo2"
        options = {["Beginner", "Intermediate", "Advanced"]}
        sx={{ width: 150, height: 10 }}
        renderInput={(params) => <TextField {...params} label="Difficulty" />}
        onChange= {(event, inputValue) => handleDifficultyChange(inputValue)}
      />
    );




  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Header, contains logo and page name */}
        <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
          <Grid container justifyContent="space-between">
            <Typography variant="h4" className="text-4xl font-bold mt-10">
              All Courses
            </Typography>
            <img src="logo.png" alt="Logo" className="h-12 mr-4" />
          </Grid>
          {/* horizontal line that have space on the left and right */}
          <hr className="border-t-3 border-black " />
        </Grid>
        <Container sx={{ py: 3 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
            direction="row"
            justify-content="space-between"
            className="mb-2"
          >
            <Grid container>
              <Grid
                container
                xs={0}
                sm={0}
                md={4}
                direction="row"
                justifyContent="space-between"
              >
                {leftButton}
                {leftButton2}
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

          <Grid container spacing={10}>
            {courses.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={ card.__thumbnail__? `${APINEMBAK}/${card.__thumbnail__.id}` : "https://source.unsplash.com/random"}
                    alt="random"
                    sx={{ height: "300px", objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="font-bold"
                    >
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions className="flex justify-center">
                    <Button
                      size="small"
                      variant="contained"
                      className="w-64 rounded-full bg-blackbutton text-white"
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {/*a plus button to add new course*/}

            <Grid item>
              <Plus handlePlusClick={handlePlusClick} />
            </Grid>
          </Grid>
          {/* INI PAKE TERNARY SEMENTARA BUAT NENTUIN DIA ALL COURSE ATO BEBERAPA DOANG */}
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
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}