import React, { ChangeEvent, useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import FileService from "@/services/file-service";
import { useRouter } from "next/router";

import "react-quill/dist/quill.snow.css";

const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface GridComponentProps {
  section?: Section;
}

const GridComponent = ({ section }: GridComponentProps = {}) => {
  const [name, setName] = useState(section?.title || "");
  const [file_id, setFileId] = useState(section?.__file__?.id);
  const [body, setBody] = useState(" ");
  const router = useRouter();
  const [course_id, setCourseId] = useState(" ");
  const [duration, setDuration] = useState(section?.duration || 0);
  const [objective, setObjective] = useState(section?.objective || "");

  useEffect(() => {
    if (router.isReady) {
      setCourseId(router.query.course_id!.toString());
    }
  }, [router.isReady]);

  useEffect(() => {
    if (file_id != null) {
      FileService.getFile(file_id)
        .then((response) => {
          //file as string
          const reader = new FileReader();
          reader.readAsBinaryString(response.data);
          reader.onloadend = () => {
            setBody(reader.result as string);
          };
        })
        .catch((error) => console.log(error));
    }
  }, [file_id]);

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
    //update
    if (section != null) {
      if (section.id != null && file_id != null) {
        const html = document.querySelector(".ql-editor")?.innerHTML;
        const formData = new FormData();
        formData.append("courseId", course_id);
        formData.append("title", name);
        formData.append("duration", duration.toString());
        formData.append("objective", objective);
        formData.append("type", "material");
        if (html) {
          const file = new File([html], "test.html", { type: "text/html" });
          formData.append("file", file);
        }
        SectionService.update(section.id.toString(), formData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDelete = () => {
    if (section != null) {
      if (section.id != null && file_id != null) {
        SectionService.delete(section.id)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
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
        <div style={{ maxHeight: "350px", overflow: "auto" }}>
          <DynamicReactQuill
            placeholder="Write something amazing"
            modules={GridComponent.modules}
            formats={GridComponent.formats}
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
      <Grid item xs={12}>
        <div className="flex justify-center mt-5">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Delete
          </button>
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
  "code-block",
];

export default GridComponent;
