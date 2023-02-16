import React, { useState } from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { Material } from "@/components/material";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const DynamicReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

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
    },]

const GridComponent = () => {
    const [body, setBody] = useState("");

    const handleBody = (e) => {
        console.log(e);
        setBody(e);
    }

    return (
        < Grid container spacing={3} justify="center" alignItems="center" >
            <Grid item xs={3}>
                <label>Material Name</label>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    variant="outlined" fullWidth
                    defaultValue={materials[1].name}
                />
            </Grid>
            <Grid item xs={3}>
                <label>Video</label>
            </Grid>
            <Grid item xs={9}>
                <TextField variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
                <label>Material Text</label>
            </Grid>
            <Grid item xs={9}>
                <DynamicReactQuill
                    placeholder='Write something amazing'
                    modules={GridComponent.modules}
                    formats={GridComponent.formats}
                    onChange={handleBody}
                    value={body}
                />
            </Grid>
        </Grid >
    );
};

GridComponent.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ],
};

GridComponent.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
]

export default GridComponent;