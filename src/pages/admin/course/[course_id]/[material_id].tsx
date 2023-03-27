import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@/components/modal";
import GridComponent from "@/components/GridComponent";
import AddSectionModal from "@/components/AddSectionModal";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CourseService from "@/services/course-service";
import CategoryService from "@/services/category-service";
import Course from "@/interfaces/course-interface";
import Category from "@/interfaces/category-interface";
import Section from "@/interfaces/section-interface";
import Quiz from "@/interfaces/quiz-interface";
import sectionService from "@/services/section-service";
import fileService from "@/services/file-service";
import { EditCourseModal } from "@/components/adminCourse/editCourseModal";
import { HtmlProps } from "next/dist/shared/lib/html-context";
import QuizSectionAdm from "@/components/adminCourse/quizSectionAdm";

const theme = createTheme();

export default function CourseDetailAdmin() {
  const router = useRouter();
  const [course_id, setCourseId] = useState("");
  const [material_id, setMaterialId] = useState("");
  const [file_id, setFileId] = useState(1);
  const [material_idInt, setMaterialIdInt] = useState(-1);
  const [file, setFile] = useState<Blob | null>(null);
  const [fileString, setFileString] = useState(" ");
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

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [section, setSection] = useState<Section[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);


  useEffect(() => {
    if(course_id === "" || material_idInt === -1) return;
    sectionService
      .getSectionByCourse(course_id)
      .then((response) => {
        console.log(response.data.data);
        setSection(response.data.data);
        //find material with material id
        const material = response.data.data.find((material : Section) => {
          return material.id === material_idInt;
        }
        );
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
    fileService.getFile(file_id).then((response) => {
      setFile(response.data);
      console.log(file)
      //convert file to string
      const reader = new FileReader();
      reader.readAsBinaryString(response.data);
      reader.onloadend = () => {
        setFileString(reader.result as string);
      };
    })
    .catch((error) => console.log(error));
    
  }, [file_id]);

  useEffect(() => {
      CategoryService.getAll()
        .then((response) => {
          console.log(response.data.data);
          setCategory(response.data.data);
        })
        .catch((error) => console.log(error));
  }, []);
  // console.log(file);
  console.log(quizContent);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [showEditButton, setShowEditButton] = useState(false);

  const handleAddMaterial = () => {
    setShowAddModal(true);
  };

  const handleEditSection = (section: Section) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  const handleEditCourse = () => {
    setShowEditModal(true);
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
                COURSE {course_id}
              </Typography>
              {!showEditButton && (
                <button
                  onClick={() => handleShowEditButton()}
                  className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-10 mx-4 mb-5"
                >
                  Edit Section
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

              <button
                onClick={() => handleEditCourse()}
                className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-10 mx-4 mb-5"
              >
                Edit Course
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
                    {material.id != material_idInt && (
                      <Link
                        href={`/admin/course/${course_id}/${material.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {/* <a style={{ color: "black" }}> */}
                        <div>{material.title}</div>
                        {/* </a> */}
                      </Link>
                    )}
                    {material.id == material_idInt && (
                      <Link
                        href={`/admin/course/${course_id}/${material.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="font-bold">{material.title}</div>
                      </Link>
                    )}
                    {showEditButton && (
                      <Button
                        onClick={() => handleEditSection(material)}
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
                {fileString ? (
                  <div dangerouslySetInnerHTML={{ __html: fileString }}></div>
                ) : (
                  <div>loading ... </div>
                )}
                {/* {file
                  ? <div dangerouslySetInnerHTML={{__html : file!.toString()}}></div> : <div>loading ... </div>} */}
                {quizContent ? <QuizSectionAdm quizContent={quizContent} /> : <></>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>

      {showEditModal && (
        <EditCourseModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          categories={category!}
          course={course!}
        />
      )}

      {selectedSection && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <GridComponent section={selectedSection} />
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
          <AddSectionModal courseId={course_id} />
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
