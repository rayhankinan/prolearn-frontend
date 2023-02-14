import React, { useState , useEffect} from "react";
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
import { Course } from "@/components/pagination";

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

const courses: Course[] = [
  {
    id: 1,
    name: "Introduction to Web Development",
    description:
      "Learn the basics of web development and build your own website from scratch.",
    img: "https://picsum.photos/300/300?random=1",
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    description:
      "Understand the core concepts of JavaScript and how to use it to build dynamic web applications.",
    img: "https://picsum.photos/300/300?random=2",
  },
  {
    id: 3,
    name: "ReactJS: Building User Interfaces",
    description:
      "Learn how to build user interfaces with the popular JavaScript library ReactJS.",
    img: "https://picsum.photos/300/300?random=3",
  },
  {
    id: 4,
    name: "NodeJS: Building Backends",
    description:
      "Build scalable and efficient backends with NodeJS and understand how to connect to databases.",
    img: "https://picsum.photos/300/300?random=4",
  },
  {
    id: 5,
    name: "Advanced CSS and SASS",
    description:
      "Take your CSS skills to the next level with SASS and learn how to write efficient and maintainable stylesheets.",
    img: "https://picsum.photos/300/300?random=5",
  },
  {
    id: 6,
    name: "Full Stack Development with MERN",
    description:
      "Build full-stack web applications using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS).",
    img: "https://picsum.photos/300/300?random=6",
  },
  {
    id: 7,
    name: "Data Structures and Algorithms",
    description:
      "Understand the basics of data structures and algorithms and learn how to implement them in code.",
    img: "https://picsum.photos/300/300?random=7",
  },
  {
    id: 8,
    name: "Introduction to Python",
    description:
      "Learn the basics of Python and how to use it to build powerful applications.",
    img: "https://picsum.photos/300/300?random=8",
  },
];


const theme = createTheme();

export default function Album() {

  const PERPAGE = 6;
  const count = Math.ceil(courses.length / PERPAGE);
  const _DATA = usePagination(courses, PERPAGE);
  let [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    _DATA.jump(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setCourses] = useState<Course[]>(courses);

  useEffect(() => {
    setCourses(
      courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    _DATA.currentData = () => filteredCourses;
  }, [searchTerm, filteredCourses]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Header, contains logo and page name */}
        <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
          <Grid container direction="row" justifyContent="space-between">
            <Typography variant="h4" className="text-4xl font-bold mt-10">
              All Courses
            </Typography>
            <img src="logo.png" alt="Logo" className="h-12 mr-4" />
          </Grid>
          {/* horizontal line that have space on the left and right */}
          <hr className="border-t-3 border-black " />
        </Grid>
        <Container sx={{ py: 2 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container direction="row" justify-content="space-between">
            <Grid container>
              <Grid item xs={0} sm={0} md={4}></Grid>

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
                justifyContent="right"
                alignItems="center"
                paddingBottom={4}
              >
                <Button component={Link} href="#" underline="none">
                  <Typography className="text-s font-bold text-black">
                    View All Courses
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={10}>
            {_DATA.currentData().map((card) => (
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
            ))}
          </Grid>
        </Container>
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
