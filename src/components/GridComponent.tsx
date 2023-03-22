import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import Material from '@/interfaces/material-interface';
import Section from '@/interfaces/section-interface';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const DynamicReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface GridComponentProps {
  section?: Section;
}

const GridComponent = ({ section }: GridComponentProps = {}) => {
  const [name, setName] = useState(section?.title || "");
  const [body, setBody] = useState(section?.file?.toString || "");

  const handleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

 
  const handleBodyChange = (
    value: string| null
  ) => {
    if(value != null)
    {
        setBody(value);
    }
  };

  const handleSave = () => {
    
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