import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddSectionModal from "@/components/AddSectionModal";
import { EditCourseModal } from "@/components/adminCourse/editCourseModal";
import { EditSectionModal } from "@/components/editSection";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import CategoryService from "@/services/category-service";
import SectionService from "@/services/section-service";
import CourseService from "@/services/course-service";
import Category from "@/interfaces/category-interface";
import Section from "@/interfaces/section-interface";
import Course from "@/interfaces/course-interface";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import Head from "next/head";

const theme = createTheme();

export default function CourseDetailAdmin() {
  const router = useRouter();
  const [course_id, setCourseId] = useState("");
  const [showSideBar, setShowSideBar] = useState(true);

  const handleToggleSideBar = () => {
    // if(material_id){
    //   return;
    // }
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query.course_id!.toString());
    }
  }, [router.isReady]);
  const material_idInt = -1;

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [section, setSection] = useState<Section[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);

  useEffect(() => {
    if (course_id === "") return;
    SectionService.getSectionByCourse(course_id)
      .then((response) => {
        setSection(response.data.data);
      })
      .catch((error) => console.log(error));

    CourseService.getById(parseInt(course_id))
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [course_id]);

  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
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
    setShowEditModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Course Description</title>
      </Head>
      <main>
        {/* Header, contains logo and page name */}
        <Grid sx={{ width: "100%", margin: "0 auto", top: 0, zIndex: 1}}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ justifyContent: "space-between", padding: "25px" }}
          >
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <Button
                onClick={() => router.push('/admin/course')}
                variant="text"
                // color="primary"
                sx={{ marginRight: "10px" }}
              >
                <ArrowBackIcon sx={{ marginRight: "5px" }} />
                  Back
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", justifyContent: "center", marginLeft: "40px"}}
                >
                  {course?.title}
                </Typography>
            </Box>

            {!showEditButton && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => handleAddMaterial()}
                  variant="outlined"
                >
                  Add Section
                </Button>
                <Button
                  onClick={() => handleShowEditButton()}
                  variant="outlined"
                  sx={{ marginLeft: "10px" }}
                >
                  Edit Sections
                </Button>
                <Button
                  onClick={() => handleEditCourse()}
                  variant="outlined"
                  color="primary"
                  sx={{ marginLeft: "10px"}}
                >
                  Edit Course
                </Button>
              </Box>
            )}

            {showEditButton && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => handleCancel()}
                  variant="outlined"
                  color="success"
                  sx={{ marginLeft: "10px" }}
                >
                  Done
                </Button>
              </Box>
            )}

          </Grid>
          {/* horizontal line that have space on the left and right */}
          <hr className="border-t-2 border-black border-opacity-20 " />
        </Grid>
        {/* End hero unit */}
        <Grid sx={{ width: "100%", margin: "0 auto", marginTop: "20px" }}>
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
                      List of Sections
                    </Typography>
                    <Grid item container direction="column">
                      {section.map((material) => (
                        <Box
                          key={material.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "#e5e7eb",
                              borderRadius: "5px",
                            },
                            textDecoration: "none",
                            width: "230px"
                          }}
                        >
                          {material.id == material_idInt && (
                            <Link href={`/admin/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 2, mr: 1, textOverflow: "ellipsis", overflow: "hidden", width: "150px" }}>
                                {material.title}
                              </Typography>
                            </Link>
                          )}
                          {material.id != material_idInt && (
                            <Link href={`/admin/course/${course_id}/${material.id}`} style={{ color: "black", textDecoration: "none"}}>
                              <Typography variant="subtitle1" sx={{ ml: 2, mr: 1, textOverflow: "ellipsis", overflow: "hidden", width: "150px" }}>{material.title}</Typography>
                            </Link>
                          )}
                          {showEditButton && (
                            <Button
                              onClick={() => handleEditSection(material)}
                              size="small"
                              // variant="contained"
                              className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                              sx={{ height: "30px", width: "7.5px"}} // added width property
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
                    <div>
                      <p>{course?.description}</p>
                    </div>
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
        <EditSectionModal 
          open={showModal}
          onClose={() => setShowModal(false)}
          section={selectedSection}
        />
      )}

      {showAddModal && (
        <AddSectionModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          courseId={course_id} 
        />
      )}
    </ThemeProvider>
  );
}

