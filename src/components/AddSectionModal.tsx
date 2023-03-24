import React, { ChangeEvent, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import "react-quill/dist/quill.snow.css";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";

const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface AddSectionModalProps {
  material?: Section;
  courseId: string;
}

const AddSectionModal = ({ 
  material, courseId }: AddSectionModalProps) => {
  const [name, setName] = useState(material?.title || "");
  const [body, setBody] = useState(" ");
  const [duration, setDuration] = useState(material?.duration || 0);
  const [objective, setObjective] = useState(material?.objective || "");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBodyChange = (value: string | null) => {
    if (value != null) {
      setBody(value);
    }
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value));
  };

  const handleObjectiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObjective(event.target.value);
  };

  const handleSave = () => {
    const html = document.querySelector(".ql-editor")?.innerHTML;

    
    const formData = new FormData();
    
    formData.append("courseId", courseId)
    formData.append("title", name);
    formData.append("duration", duration.toString());
    formData.append("objective", objective);
    formData.append("type", "material");
    if (html) {
      const file = new File([html], "test.html", { type: "text/html" });
      formData.append("file", file);
    }

    console.log(formData)
    SectionService.create(formData)
      .then((res) => {
        console.log(res);
        //refresh page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      }
      );
  };
  

  return (
    <Grid container spacing={3} style={{height: "600px", overflow: "auto"}}>
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
        <div style={{overflow: "auto", maxHeight : "350px" }}>
          <DynamicReactQuill
            placeholder="Write something amazing"
            modules={AddSectionModal.modules}
            formats={AddSectionModal.formats}
            onChange={handleBodyChange}
            value={body}
            
          />
        </div>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Duration (in minutes)</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          value={duration}
          onChange={handleDurationChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Objective</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          value={objective}
          onChange={handleObjectiveChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Quiz Title</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          // value={name}
          // onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Jumlah Soal</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          // value={duration}
          // onChange={handleDurationChange}
        />
      </Grid>
      {/* Create Dropdown for question */}
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Question</label>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Questions
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={age}
            // onChange={handleChange}
            label="Question"
          >
            <MenuItem >Question 1</MenuItem>
            <MenuItem >Question 2</MenuItem>
            <MenuItem >Question 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Material Text</label>
      </Grid>
      <Grid item xs={9}>
        <div style={{overflow: "auto", maxHeight : "350px" }}>
          <DynamicReactQuill
            placeholder="Write something amazing"
            // modules={AddSectionModal.modules}
            // formats={AddSectionModal.formats}
            // onChange={handleBodyChange}
            // value={body}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bg-green-500 hover:bg-green-600"
          style={{color: "white", marginTop: "16px" }}
          // onClick={() => handleAddAnswer(answer1)}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Answers</label>
      </Grid>
      <Grid item xs={7}>
        <TextField
          variant="outlined"
          fullWidth
          // value={answer1}
          // onChange={(e) => setAnswer1(e.target.value)}
        />
      </Grid>
      <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bg-green-500 hover:bg-green-600"
          style={{color: "white" }}
          // onClick={() => handleAddAnswer(answer1)}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Correct Answer</label>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Correct Answer
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={age}
            // onChange={handleChange}
            label="Correct Answer"
          >
            <MenuItem >Answer 1</MenuItem>
            <MenuItem >Answer 2</MenuItem>
            <MenuItem >Answer 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Save
          </button>
        </div>
      </Grid>
    </Grid>
  );
};

AddSectionModal.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
    //set min height for quill editor
    [{ height: "350px" }],
  ],
};

AddSectionModal.formats = [
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
  "code-block",
];

export default AddSectionModal;
