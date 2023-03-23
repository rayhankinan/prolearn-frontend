import React, { ChangeEvent, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import "react-quill/dist/quill.snow.css";

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
