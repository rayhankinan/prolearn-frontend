import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
// import { Material } from "@/components/material";
import Modal from "@/components/modal";
import GridComponent from "@/components/GridComponent";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CategoryService from "@/services/category-service";
import Category from "@/interfaces/category-interface";
import Section from "@/interfaces/section-interface";


interface Material {
  id: number;
  name: string;
  text: string;
  video_url: string;
  course_id: number;
}

interface GridComponentProps {
  material: Material;
}

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

const materials: Material[] = [
  {
    id: 1,
    name: "Introduction to Web Development",
    text: "Learn the basics of web development and build your own website from scratch.",
    video_url: "https://picsum.photos/300/300?random=1",
    course_id: 1,
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    text: "Understand the core concepts of JavaScript and how to use it to build dynamic web applications.",
    video_url: "https://picsum.photos/300/300?random=2",
    course_id: 1,
  },
  {
    id: 3,
    name: "ReactJS: Building User Interfaces",
    text: "Learn how to build user interfaces with the popular JavaScript library ReactJS.",
    video_url: "https://picsum.photos/300/300?random=3",
    course_id: 1,
  },
  {
    id: 4,
    name: "NodeJS: Building Backends",
    text: "Build scalable and efficient backends with NodeJS and understand how to connect to databases.",
    video_url: "https://picsum.photos/300/300?random=4",
    course_id: 1,
  },
  {
    id: 5,
    name: "Advanced CSS and SASS",
    text: "Take your CSS skills to the next level with SASS and learn how to write efficient and maintainable stylesheets.",
    video_url: "https://picsum.photos/300/300?random=5",
    course_id: 1,
  },
  {
    id: 6,
    name: "Full Stack Development with MERN",
    text: "Build full-stack web applications using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS).",
    video_url: "https://picsum.photos/300/300?random=6",
    course_id: 1,
  },
  {
    id: 7,
    name: "Data Structures and Algorithms",
    text: "Understand the basics of data structures and algorithms and learn how to implement them in code.",
    video_url: "https://picsum.photos/300/300?random=7",
    course_id: 1,
  },
  {
    id: 8,
    name: "Introduction to Python",
    text: "Learn the basics of Python and how to use it to build powerful applications.",
    video_url: "https://picsum.photos/300/300?random=8",
    course_id: 1,
  },
];

const theme = createTheme();

export default function CourseDetailAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [showEditButton, setShowEditButton] = useState(false);
  const router = useRouter();
  const { course_id, material_id } = router.query;
  // const course_id: string = router.query.course_id!.toString() ;
  // const material_id: string = router.query.material_id!.toString();
  if (typeof course_id === "string") {
    const course_idInt = parseInt(course_id);
  }

  const material_idInt = -1;

  const handleAddMaterial = () => {
    setShowAddModal(true);
  };

  const handleEditMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const handleShowEditButton = () => {
    setShowEditButton(true);
  };
  const handleCancel = () => {
    setShowEditButton(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowAddModal(false);
  };

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Header, contains logo and page name */}
        <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ justifyContent: "center" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h4"
                className="text-4xl font-bold mt-10 mx-4 mb-5"
                sx={{ marginRight: "10px" }}
              >
                COURSE X
              </Typography>
              {!showEditButton && (
                <button
                  onClick={() => handleShowEditButton()}
                  className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-10 mx-4 mb-5"
                >
                  Edit Course
                </button>
              )}

              {showEditButton && (
                <Button
                  onClick={() => handleCancel()}
                  className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-10 mx-4 mb-5"
                >
                  Done
                </Button>
              )}

              <button
                onClick={() => handleAddMaterial()}
                className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-10 mx-4 mb-5"
              >
                Add Material
              </button>
            </Box>
          </Grid>
          {/* horizontal line that have space on the left and right */}
          <hr className="border-t-3 border-black " />
        </Grid>
        {/* End hero unit */}
        <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ borderRight: "1px solid #ccc" }}>
              <Grid item container direction="column">
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                  key={"desc"}
                >
                  <Link
                    href={`/course/admin/1/description`}
                    style={{ color: "black" }}
                  >
                    {/* <a style={{ color: "black" }}> */}
                    <div>Description</div>
                    {/* </a> */}
                  </Link>
                </Grid>
                {materials.map((material) => (
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                    key={material.id}
                  >
                    {material.id != material_idInt && (
                      <Link
                        href={`/course/admin/1/${material.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {/* <a style={{ color: "black" }}> */}
                        <div>{material.name}</div>
                        {/* </a> */}
                      </Link>
                    )}
                    {showEditButton && (
                      <Button
                        onClick={() => handleEditMaterial(material)}
                        size="small"
                        // variant="contained"
                        className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                        sx={{ height: "40px", width: "10px" }} // added width property
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={9} sx={{ paddingLeft: "20px" }}>
              <Grid item>
                <ReactMarkdown></ReactMarkdown>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
      
      {selectedMaterial && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <GridComponent material={selectedMaterial} />
          <div className="flex justify-center mt-5">
            <button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal show={showAddModal} onClose={() => setShowModal(false)}>
          <GridComponent />
          <div className="flex justify-center mt-5">
            <button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </ThemeProvider>
  );
}
