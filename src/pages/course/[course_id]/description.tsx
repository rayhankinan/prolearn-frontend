import React, {useState, useEffect}  from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {LinkProps} from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown'
import  Material from "@/interfaces/material-interface";
import GridComponent from '@/components/GridComponent';
import { Button, Grid, Typography } from "@mui/material";
import { useRouter, Router } from 'next/router';
import Section from "@/interfaces/section-interface";
import Category from "@/interfaces/category-interface";
import SectionService from "@/services/section-service";
import fileService from "@/services/file-service";
import CategoryService from "@/services/category-service";



const theme = createTheme();

export default function UserCourseDetail() {
    const router = useRouter();
    const [course_id, setCourseId] = useState("");

    useEffect(() => {
        if (router.isReady) {
          setCourseId(router.query.course_id!.toString());
        }
    }, [router.isReady]);
    const material_idInt = -1;

    const [section, setSection] = useState<Section[]>([]);

    useEffect(() => {
        SectionService
          .getSectionByCourse(course_id)
          .then((response) => {
            console.log(response.data.data);
            setSection(response.data.data);
          })
          .catch((error) => console.log(error));
      }, [course_id]);
    
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
      CategoryService.getAll()
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Grid sx ={{width: "70%", margin: "0 auto", marginTop: "30px"}}>
                    <Grid container direction= "row" justifyContent= "space-between" alignItems="center" sx={{justifyContent: 'center'}}>
                        <Box sx= {{display: "flex", alignItems: "center"}}>
                            <Typography variant= "h4" className= "text-4xl font-bold mt-10 mx-4 mb-5" sx= {{marginRight: "10px"}}>
                                Course {course_id}
                            </Typography>
                        </Box>
                    </Grid>
                    <hr className="border-t-3 border-black " />
                </Grid>

                <Grid sx={{width: "70%", margin: "0 auto", marginTop: "30px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{borderRight: "1px solid #ccc"}}>
                            <Grid item container direction= "column">
                                {section.map((material) => (
                                    <Grid sx= {{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px"}} key= {material.id}>
                                        {(material.id == material_idInt) &&
                                            <Link href={`/course/${course_id}/${material.id}`} style={{   color: "black" }}>
                                                {/* <a style={{ color: "black" }}> */}
                                                <div className="font-bold">{material.title}</div>
                                                {/* </a> */}
                                            </Link>                                        }
                                        {(material.id != material_idInt) &&
                                            <Link href={`/course/${course_id}/${material.id}`} style={{ textDecoration: "none", color: "black" }}>
                                            {/* <a style={{ color: "black" }}> */}
                                                <div>{material.title}</div>
                                            {/* </a> */}
                                        </Link>
                                        }
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={9} sx={{ paddingLeft: '20px' }}>
                            <Grid item>
                                <p>Description</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </ThemeProvider>
    )
}