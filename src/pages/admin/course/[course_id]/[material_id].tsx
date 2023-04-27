import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@/components/modal";
import GridComponent from "@/components/GridComponent";
import AddSectionModal from "@/components/AddSectionModal";
import { Button, Grid, Typography, IconButton } from "@mui/material";
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
import QuizSectionAdm from "@/components/adminCourse/quizSectionAdm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme();

export default function CourseDetailAdmin() {
  const router = useRouter();
  const [course_id, setCourseId] = useState("");
  const [material_id, setMaterialId] = useState("");
  const [file_id, setFileId] = useState(1);
  const [material_idInt, setMaterialIdInt] = useState(-1);
  const [title, setTitle] = useState(" ");
  const [file, setFile] = useState<Blob | null>(null);
  const [fileString, setFileString] = useState(" ");
  const [quizContent, setQuizContent] = useState<Quiz | null>(null);
  const [showSideBar, setShowSideBar] = useState(true);

  const handleToggleSideBar = () => {
    // if(material_id){
    //   return;
    // }
    setShowSideBar(!showSideBar);
  };

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
    if (course_id === "" || material_idInt === -1) return;
    sectionService
      .getSectionByCourse(course_id)
      .then((response) => {
        console.log(response.data.data);
        setSection(response.data.data);
        //find material with material id
        const material = response.data.data.find((material: Section) => {
          return material.id === material_idInt;
        });
        setTitle(material.title);
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
        // console.log(file);
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
        <Grid sx={{ width: "100%", margin: "0 auto", position: 'fixed', top: 0, zIndex: 1, backgroundColor: "#f3f3f3"}}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ justifyContent: "left" }}
            marginLeft={"10px"}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => router.push('/admin/course')}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h4"
                className="text-2xl font-bold mt-6 mx-4 mb-6"
                sx={{ marginRight: "20px" }}
              >
                {course?.title}
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
          <hr className="border-t-2 border-black border-opacity-20 " />
        </Grid>
        {/* End hero unit */}
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
                      Daftar Modul
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
                            <Link href={`/admin/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 2, mr: 1}}>
                                {material.title}
                              </Typography>
                            </Link>
                          )}
                          {material.id != material_idInt && (
                            <Link href={`/admin/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ ml: 2, mr: 1 }}>{material.title}</Typography>
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
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              )}
              <Grid item xs={showSideBar ? 9 : 12}>
                <Grid item>
                  {fileString && !quizContent ? (
                    <div style={{
                      display: "flex",
                      margin: "0 10px",
                      textAlign: "justify",
                      flexWrap: "wrap",
                      flexDirection: "column",
                    }} dangerouslySetInnerHTML={{ __html: fileString }}></div>
                  ) : (
                    <div></div>
                )}
                {quizContent ? (
                  <QuizSectionAdm
                    quizContent={quizContent}
                    title={title}
                    courseId={course_id}
                    materialId={material_idInt}
                  />
                ) : (
                  <></>
                )}
                </Grid>
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-3/4 h-3/4 p-3 rounded-lg flex flex-col justify-center items-center shadow=lg">
            <div className="text-2xl font-semibold mb-3">
              Add Section
            </div>
            <AddSectionModal courseId={course_id} />
            <div className="flex justify-center">
              <Button
                className="w-24"
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
