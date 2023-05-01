import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Section from "@/interfaces/section-interface";
import Category from "@/interfaces/category-interface";
import Quiz from "@/interfaces/quiz-interface";
import CourseService from "@/services/course-service";
import SectionService from "@/services/section-service";
import QuizService from "@/services/quiz-service";
import fileService from "@/services/file-service";
import CategoryService from "@/services/category-service";
import QuizSection from "@/components/userCourse/quizSection";
import Course from "@/interfaces/course-interface";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import RatingModal from "@/components/rating";
import Head from "next/head";

const theme = createTheme();

export default function UserCourseDetail() {
  const router = useRouter();
  const [course_id, setCourseId] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [material_id, setMaterialId] = useState("");
  const [file_id, setFileId] = useState(1);
  const [material_idInt, setMaterialIdInt] = useState(-1);
  const [file, setFile] = useState<Blob | null>(null);
  const [fileString, setFileString] = useState(" ");
  const [score, setScore] = useState("");
  const [quizId, setQuizId] = useState(1);
  const [quizContent, setQuizContent] = useState<Quiz | null>(null);
  const [showSideBar, setShowSideBar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [material_title, setMaterialTitle] = useState("");

  useEffect(() => {
    if (section.length > 0) {
      const material = section.find((material: Section) => {
        return material.id === material_idInt;
      });
      if (material) {
        setMaterialTitle(material.title);
      }
    }
  }, [material_idInt]);


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

  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query.course_id!.toString());
      setMaterialId(router.query.material_id!.toString());
      //set material id int with material id converted to int
      setMaterialIdInt(parseInt(router.query.material_id!.toString()));
    }
  }, [router.isReady]);

  const [section, setSection] = useState<Section[]>([]);

  useEffect(() => {
    if (course_id === "" || material_idInt === -1) return;
    SectionService.getSectionByCourse(course_id)
      .then((response) => {
        setSection(response.data.data);
        //find material with material id
        const material = response.data.data.find((material: Section) => {
          return material.id === material_idInt;
        });
        setFileId(material.__file__.id);
        if (material.__quiz__ !== null) {
          setQuizContent(material.__quiz__);
        }
      })
      .catch((error) => console.log(error));

    CourseService.getById(parseInt(course_id))
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [course_id, material_idInt]);

  useEffect(() => {
    if (course_id === "" || material_idInt === -1) return;
    fileService
      .getFile(file_id)
      .then((response) => {
        setFile(response.data);
        //convert file to string
        const reader = new FileReader();
        reader.readAsBinaryString(response.data);
        reader.onload = () => {
          setFileString(reader.result as string);
        };
      })
      .catch((error) => console.log(error));
  }, [file_id]);

  const [category, setCategory] = useState<Category[] | null>(null);
  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (quizContent === null) return;
    QuizService.viewHistory(quizContent.id)
      .then((response) => {
        setScore(response.data.data.correctAnswers.toString());
      })
      .catch((error) => {
        console.log(error);
        setScore("-");
      });
  }, [quizContent]);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [quizStarted, setQuizStarted] = useState(false);
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handlePrevious = () => {
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
    const currentIndex = section.findIndex((section) => section.id === material_idInt);
    const nextMaterialId = currentIndex < section.length - 1 ? section[currentIndex + 1].id : null;
    // return `/course/${course_id}/${nextMaterialId}`
    // router.push(`/course/${course_id}/${nextMaterialId}`);
    if(nextMaterialId){
      window.location.href = `/course/${course_id}/${nextMaterialId}`;
    }else{
      window.location.href = `/course/${course_id}/description`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Head>
          <title>Course</title>
        </Head>
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
                sx={{ textAlign: "center", fontWeight: "bold", marginRight: "210px"}}
              >
                {course?.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>

          </Grid>
          <hr className="border-t-2 border-black border-opacity-20 " />
        </Grid>
        <Grid sx={{ width: "100%", margin: "0 auto", marginTop: "120px", marginBottom: "150px"}}>
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
                      List Of Sections
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
                  {fileString && !quizStarted && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 200px",
                      textAlign: "justify",
                      flexWrap: "wrap",
                      flexDirection: "column",
                    }} dangerouslySetInnerHTML={{ __html: fileString }}></div>
                  )}
                  {quizContent &&
                    !quizStarted &&
                    quizContent.content.questions.length > 0 && (
                      <div style={{ width: "70%", marginTop: "20px", margin: "auto" }} className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
                        <div className="font-bold text-lg mb-2 md:mb-0 md:mr-2">
                          Previous Grade:  {score !== '-' ? (parseInt(score)/quizContent.content.questions.length * 100).toFixed(0) : '-'}%
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleStartQuiz()}
                        >
                          Start
                        </Button>
                      </div>
                    )}
                  {quizContent &&
                    !quizStarted &&
                    quizContent.content.questions.length <= 0 && (
                      <div style={{ width: "70%", marginTop: "20px", margin: "auto" }} className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
                        <div className="font-bold text-lg mb-2 md:mb-0 md:mr-2">
                          Quiz's questions are not available
                        </div>
                      </div>
                    )}
                  {quizContent && quizStarted ? (
                    <QuizSection quizContent={quizContent} />
                  ) : (
                    <div></div>
                  )}
                  {section.findIndex((material) => material.id === material_idInt) === section.length - 1 && (
                    <Button 
                    style={{ display: "flex", margin: "auto", marginTop: "20px" }}
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenModal}>
                      Finish This Course
                    </Button>
                  )}
                  <RatingModal isOpen={isModalOpen} onClose={handleCloseModal} courseId={parseInt(course_id)} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f5f5f5", padding: "25px"}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} onClick={handlePrevious}>
                Previous Section
              </Button>
              
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="center">
                {section.find(material => material.id === material_idInt)?.title}
              </Typography>
            </Grid>
            <Grid item xs={2} style={{display: "flex", justifyContent: "end"}}>
              {/* if last module, disable next module button */}
              {section.findIndex((material) => material.id === material_idInt) === section.length - 1 ? (
                <Button variant="outlined" color="primary" endIcon={<ArrowForwardIcon />} disabled>
                  Next Section
                </Button>
              ) : (
                <Button variant="outlined" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
                  Next Section
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </main>
    </ThemeProvider>
  );
}
