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
import usePagination from "@/components/pagination";
import { Plus } from "@/components/plus";
import { AddCourseModal } from "@/components/addCourseModal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CourseService from "@/services/course-service";
import { Course } from "@/services/course-service";

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



const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  CourseService.getAll({ page: 1 })
    .then((response) => setCourses(response.data))
    .catch((error) => console.log(error));
}, []);

type categories = string;

const categories: categories[] = [
  "All",
  "Web Development",
  "JavaScript",
  "ReactJS",
  "NodeJS",
  "CSS",
  "Full Stack",
  "Data Structures",
  "Python",
];


const theme = createTheme();

export default function Album() {
  const [showAll, setShowAll] = useState(false);
  let PERPAGE = 6;
  const count = Math.ceil(courses.length / PERPAGE);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (course: Course) => {
    console.log(course)
    //courses.push(course);
    setIsModalOpen(false);
  };

  let [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

    setPage(value);

  };


  //view all course button is clicked, show all courses remove pagination

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const [searchTerm, setSearchTerm] = useState("");

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


    leftButton = (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        sx={{ width: 300, height: 10 }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
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
              <Grid item xs={0} sm={0} md={4} direction="row">
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

          <Grid container spacing={10}>
            {/* INI PAKE TERNARY SEMENTARA BUAT NENTUIN DIA ALL COURSE ATO BEBERAPA DOANG */}
            {showAll
              ? courses.map((card) => (
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
                      image={card.img}
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
                        {card.name}
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
              ))
              : _DATA.currentData().map((card) => (
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
                      image={card.img}
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
                        {card.name}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    <CardActions className="flex justify-center">
                      <Link href="/course/1/1">
                        <a>
                          <Button
                            size="small"
                            variant="contained"
                            className="w-64 rounded-full bg-blackbutton text-white">
                            Edit
                          </Button>
                        </a>
                      </Link>
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
