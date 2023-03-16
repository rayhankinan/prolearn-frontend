import React, {useState}  from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {LinkProps} from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown'
import { Material } from "@/components/material";
import GridComponent from '@/components/GridComponent';
import { Button, Grid, Typography } from "@mui/material";
import { useRouter, Router } from 'next/router';

const materials: Material[] = [
    {
        id: 1,
        name: "Introduction to Web Development",
        text:
            "Learn the basics of web development and build your own website from scratch.",
        video_url: "https://picsum.photos/300/300?random=1",
        course_id: 1,
    },
    {
        id: 2,
        name: "JavaScript Fundamentals",
        text:
            "Understand the core concepts of JavaScript and how to use it to build dynamic web applications.",
        video_url: "https://picsum.photos/300/300?random=2",
        course_id: 1,
    },
]

const theme = createTheme();

export default function UserCourseDetail() {
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const router = useRouter();
    // let {course_id, material_id} = router.query;
    // TO DO - fix error
    const course_id: string = router.query.course_id ? router.query.course_id.toString() : '';
    const material_id: string = router.query.material_id ? router.query.material_id.toString() : '';

    const course_idInt = parseInt(course_id);
    const material_idInt = parseInt(material_id);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Grid sx ={{width: "70%", margin: "0 auto", marginTop: "30px"}}>
                    <Grid container direction= "row" justifyContent= "space-between" alignItems="center" sx={{justifyContent: 'center'}}>
                        <Box sx= {{display: "flex", alignItems: "center"}}>
                            <Typography variant= "h4" className= "text-4xl font-bold mt-10 mx-4 mb-5" sx= {{marginRight: "10px"}}>
                                Course X
                            </Typography>
                        </Box>
                    </Grid>
                    <hr className="border-t-3 border-black " />
                </Grid>

                <Grid sx={{width: "70%", margin: "0 auto", marginTop: "30px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{borderRight: "1px solid #ccc"}}>
                            <Grid item container direction= "column">
                                {materials.map((material) => (
                                    <Grid sx= {{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px"}} key= {material.id}>
                                        {(material.id == material_idInt) &&
                                            <Link href={`/course/1/${material.id}`} style={{   color: "black" }}>
                                                {/* <a style={{ color: "black" }}> */}
                                                    <div>{material.name}</div>
                                                {/* </a> */}
                                            </Link>                                        }
                                        {(material.id != material_idInt) &&
                                            <Link href={`/course/1/${material.id}`} style={{ textDecoration: "none", color: "black" }}>
                                            {/* <a style={{ color: "black" }}> */}
                                                <div>{material.name}</div>
                                            {/* </a> */}
                                        </Link>
                                        }
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={9} sx={{ paddingLeft: '20px' }}>
                            <Grid item><ReactMarkdown>Bla bla bla</ReactMarkdown></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </ThemeProvider>
    )
}