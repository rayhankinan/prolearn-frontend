import React, { ChangeEvent, useState } from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import ReactQuill from 'react-quill';
// import { Material } from "@/components/material";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const DynamicReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

interface Material {
    id: number;
    name: string;
    text: string;
    video_url: string;
    course_id: number;
}

interface GridComponentProps {
    material: Material;
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
    },]

const GridComponent = ({ material }: GridComponentProps) => {
    const [name, setName] = useState(material.name || "");
    const [videoUrl, setVideoUrl] = useState(material.video_url || "");
    const [body, setBody] = useState(material.text || "");

    const handleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleVideoUrlChange = (event : ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
    };

    const handleBodyChange = (
        value: string| null
      ) => {
        //change value to all lowercase
        if(value != null)
        {
           setBody(value);
        }
      };



    const handleSave = () => {
        // Gather all the values and do something with them (e.g. save to database, update state)
        const updatedMaterial = {
            ...material,
            name: name,
            video_url: videoUrl,
            text: body,
        };
        console.log(updatedMaterial);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={3} style={{ marginTop: "16px" }}>
                <label>Material Name</label>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
            </Grid>
            <Grid item xs={3} style={{ marginTop: "5px" }}>
                <label>Video</label>
            </Grid>
            <Grid item xs={9} >
                {/* <TextField
                    variant="outlined"
                    fullWidth
                    value={videoUrl}
                    onChange={handleVideoUrlChange}
                /> */}
                <input type="file" onChange={handleVideoUrlChange} />
            </Grid>
            <Grid item xs={3} style={{ marginTop: "16px" }}>
                <label>Material Text</label>
            </Grid>
            <Grid item xs={9}>
                <div style={{ height: "400px", overflow: "auto" }}>
                    <DynamicReactQuill
                        placeholder="Write something amazing"
                        modules={GridComponent.modules}
                        formats={GridComponent.formats}
                        onChange={handleBodyChange}
                        value={body}

                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="flex justify-center mt-5">
                    <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4">Save</button>
                </div>
            </Grid>
        </Grid>
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