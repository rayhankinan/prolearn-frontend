import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Section from "@/interfaces/section-interface";
import Category from "@/interfaces/category-interface";
import SectionService from "@/services/section-service";
import CategoryService from "@/services/category-service";
import CourseService from "@/services/course-service";
import Course from "@/interfaces/course-interface";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import RatingModal from "@/components/rating";

const theme = createTheme();

export default function UserCourseDetail() {
  const router = useRouter();
  const [course_id, setCourseId] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [showSideBar, setShowSideBar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleSideBar = () => {
    // if(material_id){
    //   return;
    // }
    setShowSideBar(!showSideBar);
  };

  const handlePrevious = () => {
    console.log("previous");
    const currentIndex = section.findIndex((section) => section.id === material_idInt);
    const previousMaterialId = currentIndex > 0 ? section[currentIndex - 1].id : null;
    // router.push(`/course/${course_id}/${previousMaterialId}`);
    // return `/course/${course_id}/${previousMaterialId}`
    if (previousMaterialId) {
      window.location.href = `/course/${course_id}/${previousMaterialId}`;
    } else {
      window.location.href = `/course/${course_id}/description`;
    }
  };
  
  const handleNext = () => {
    console.log("next");
    const currentIndex = section.findIndex((section) => section.id === material_idInt);
    const nextMaterialId = currentIndex < section.length - 1 ? section[currentIndex + 1].id : null;
    // return `/course/${course_id}/${nextMaterialId}`
    // router.push(`/course/${course_id}/${nextMaterialId}`);
    if(nextMaterialId){
      window.location.href = `/course/${course_id}/${nextMaterialId}`;
    }else{
      // bingung mau redirect ke mana
      window.location.href = `/course/${course_id}/description`;
    }
  };

  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query.course_id!.toString());
    }
  }, [router.isReady]);
  const material_idInt = -1;

  const [section, setSection] = useState<Section[]>([]);

  useEffect(() => {
    SectionService.getSectionByCourse(course_id)
      .then((response) => {
        console.log(response.data.data);
        setSection(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [course_id]);

  useEffect(() => {
    if(course_id === "") return;
    CourseService.getById(parseInt(course_id))
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [course_id]);

  const [_, setCategories] = useState<Category[]>([]);
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
      <Grid
          sx={{
            width: "100%",
            margin: "0 auto",
            position: "fixed",
            top: 0,
            zIndex: 1,
            backgroundColor: "#f3f3f3",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: "25px" }}
            display={"flex"}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => router.push("/course")}
                variant="text"
                style={{ marginRight: "10px", textAlign: "left"}}
                // sx={{ textAlign: "left" }}
              >
                <ArrowBackIcon sx={{ marginRight: "5px" }} />
                Back to Course List
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "bold", marginRight: "0px"}}
              >
                {course?.title}
              </Typography>
            </Box>
          </Grid>
          <hr className="border-t-2 border-black border-opacity-20 " />
        </Grid>

        <Grid sx={{ width: "100%", margin: "0 auto", marginTop: "100px" }}>
          <Grid item xs={3} sx={{marginBottom: "30px", marginLeft: "15px"}}>
            <Button 
              variant="contained" 
              style={{ 
                background: 'none', 
                boxShadow: 'none', 
                color: 'inherit', 
                textTransform: 'none', 
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }} 
              startIcon={<MenuIcon />} 
              onClick={handleToggleSideBar}
              >
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ paddingLeft: "20px" }}>
            <Grid container spacing={2}>
            {showSideBar && (
                <Grid 
                  item 
                  xs={2} 
                  sx={{
                    borderRight: '1px solid #ccc',
                    transform: 'translateX(0)',
                    transition: 'transform ease-out 150ms',
                  }}
                  className="transition-all"
                  >
                  <Box sx={{marginLeft: "16px", marginTop: "-3px"}}>
                    <Typography variant="h6" sx={{ color: "#333", mb: 4, fontWeight: "bold"}}>
                      List of Modules
                    </Typography>
                    <Grid item container direction="column">
                      {section.map((material) => (
                        <Box
                          key={material.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "#e5e7eb",
                              borderRadius: "5px",
                            },
                            textDecoration: "none"
                          }}
                        >
                          {material.id == material_idInt && (
                            <Link href={`/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 2, mr: 1}}>
                                {material.title}
                              </Typography>
                            </Link>
                          )}
                          {material.id != material_idInt && (
                            <Link href={`/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ ml: 2, mr: 1 }}>{material.title}</Typography>
                            </Link>
                          )}
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              )}
              <Grid item xs={showSideBar ? 9 : 12}>
                <Grid item>
                  <div style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 200px",
                        textAlign: "justify",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: "20px",
                        marginBottom: "20px"}}>
                        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "20px"}}>
                          {course?.description}
                        </Typography>
                    </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f5f5f5", padding: "25px"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} disabled={true}>
                Modul Sebelumnya
              </Button>
              
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="center">
                Description
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
                Modul Berikutnya
              </Button>
            </Grid>
          </Grid>
        </div>
      </main>
    </ThemeProvider>
  );
}
