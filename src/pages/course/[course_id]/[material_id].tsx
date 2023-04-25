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
import { Button } from "@material-ui/core";

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

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
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
        console.log(response.data.data);
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
        console.log(response.data.data);
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
        console.log(file);
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
        console.log(response.data.data);
        setCategory(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (quizContent === null) return;
    QuizService.viewHistory(quizContent.id)
      .then((response) => {
        console.log(response.data.data);
        setScore(response.data.data.correct_answer.toString());
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
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
                COURSE {course_id}
              </Typography>
            </Box>
          </Grid>
          <hr className="border-t-3 border-black " />
        </Grid>

        <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ borderRight: "1px solid #ccc" }}>
              <Grid item container direction="column">
                {section.map((material) => (
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                    key={material.id}
                  >
                    {material.id == material_idInt && (
                      <Link
                        href={`/course/${course_id}/${material.id}`}
                        style={{ color: "black" }}
                      >
                        {/* <a style={{ color: "black" }}> */}
                        <div className="font-bold">{material.title}</div>
                        {/* </a> */}
                      </Link>
                    )}
                    {material.id != material_idInt && (
                      <Link
                        href={`/course/${course_id}/${material.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {/* <a style={{ color: "black" }}> */}
                        <div>{material.title}</div>
                        {/* </a> */}
                      </Link>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={9} sx={{ paddingLeft: "20px" }}>
              <Grid item>
                {fileString ? (
                  <div style={{ marginLeft: "15px" }} dangerouslySetInnerHTML={{ __html: fileString }}></div>
                ) : (
                  <div>loading ... </div>
                )}
                {quizContent &&
                  !quizStarted &&
                  quizContent.content.questions.length > 0 && (
                    <div style={{ marginTop: "20px" }} className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
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
                    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
}
