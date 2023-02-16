import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown'
import { Material } from "@/components/material";
import Modal from "@/components/modal";
import GridComponent from '@/components/GridComponent';


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
    {
        id: 3,
        name: "ReactJS: Building User Interfaces",
        text:
            "Learn how to build user interfaces with the popular JavaScript library ReactJS.",
        video_url: "https://picsum.photos/300/300?random=3",
        course_id: 1,
    },
    {
        id: 4,
        name: "NodeJS: Building Backends",
        text:
            "Build scalable and efficient backends with NodeJS and understand how to connect to databases.",
        video_url: "https://picsum.photos/300/300?random=4",
        course_id: 1,
    },
    {
        id: 5,
        name: "Advanced CSS and SASS",
        text:
            "Take your CSS skills to the next level with SASS and learn how to write efficient and maintainable stylesheets.",
        video_url: "https://picsum.photos/300/300?random=5",
        course_id: 1,
    },
    {
        id: 6,
        name: "Full Stack Development with MERN",
        text:
            "Build full-stack web applications using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS).",
        video_url: "https://picsum.photos/300/300?random=6",
        course_id: 1,
    },
    {
        id: 7,
        name: "Data Structures and Algorithms",
        text:
            "Understand the basics of data structures and algorithms and learn how to implement them in code.",
        video_url: "https://picsum.photos/300/300?random=7",
        course_id: 1,
    },
    {
        id: 8,
        name: "Introduction to Python",
        text:
            "Learn the basics of Python and how to use it to build powerful applications.",
        video_url: "https://picsum.photos/300/300?random=8",
        course_id: 1,
    },
];

const theme = createTheme();


export default function CourseDetail() {
    const [showModal, setShowModal] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Header, contains logo and page name */}
                <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ justifyContent: 'center' }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button
                                onClick={() => setShowModal(true)}
                                size="small"
                                variant="contained"
                                className="w-32 rounded-full bg-blackbutton text-white"
                                sx={{ height: "40px", marginTop: "30px" }}
                            >
                                Edit
                            </Button>
                            <Modal show={showModal} onClose={() => setShowModal(false)}>
                                <GridComponent />
                            </Modal>
                            <Typography variant="h4" className="text-4xl font-bold mt-10 mx-4">
                                COURSE X
                            </Typography>
                        </Box>
                        <img src="logo.png" alt="Logo" className="h-12 mr-4" />
                    </Grid>
                    {/* horizontal line that have space on the left and right */}
                    <hr className="border-t-3 border-black " />
                </Grid>
                {/* End hero unit */}
                <Grid sx={{ width: "70%", margin: "0 auto", marginTop: "30px" }}>

                    <Grid container spacing={2}>
                        <Grid xs={3} sx={{ borderRight: '1px solid #ccc' }}>
                            <Grid container direction="column">
                                {materials.map((material) => (
                                    <Grid sx={{ marginBottom: "10px" }}>{material.name}</Grid>

                                ))}
                            </Grid>
                        </Grid>
                        <Grid xs={9} sx={{ paddingLeft: '20px' }}>
                            <ReactMarkdown>*React-Markdown* is **Awesome**</ReactMarkdown>

                        </Grid>
                    </Grid>
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
        </ThemeProvider >
    );
}