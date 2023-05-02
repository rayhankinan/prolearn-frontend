import React, { ChangeEvent, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import FileService from "@/services/file-service";
import { useRouter } from "next/router";

import "react-quill/dist/quill.snow.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

type EditSectionProps = {
  open: boolean;
  onClose: () => void;
  section?: Section;
}

export const EditSectionModal = ({ open, onClose, section }: EditSectionProps) => {
  const [name, setName] = useState(section?.title || "");
  const [file_id, setFileId] = useState(section?.__file__?.id);
  const [body, setBody] = useState(" ");
  const type = section?.type;
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
    setName(section?.title || "");
    setFileId(section?.__file__?.id);
    setDuration(section?.duration || 0);
    setObjective(section?.objective || "");
  }, [section]);

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

  const handleObjectiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObjective(event.target.value);
  };

  const handleSave = () => {
    //update
    if (section != null) {
      if (section.id != null && file_id != null) {
        let html = document.querySelector(".ql-editor")?.innerHTML;
        if (html?.includes("<iframe")) {
          html = html.replace(
            '<iframe',
            '<iframe style="width: 1280px; height: 720px;'
          );
        }
        const formData = new FormData();
        formData.append("courseId", course_id);
        formData.append("title", name);
        formData.append("duration", duration.toString());
        formData.append("objective", objective);
        formData.append("type", type!);
        if (html) {
          const file = new File([html], "test.html", { type: "text/html" });
          formData.append("file", file);
        }
        SectionService.update(section.id.toString(), formData)
          .then((res) => {
            window.location.reload();
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
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Section</DialogTitle>
      <DialogContent>
        <div className="flex flex-row mb-3">
          <Grid sm={3} className="flex justify-center items-center">
            <label>Section Title</label>
          </Grid>
          <Grid xs={9} className="flex items-center">
            <TextField
              required
              margin="dense"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
        </div>
        <div className="flex flex-row mb-3">
          <Grid sm={3} className="flex justify-center items-center">
            <label>{type === 'material' ? "Material Text" : "Description"}</label>
          </Grid>
          <Grid item xs={9} className="flex items-center">
            <div style={{ overflow: "auto", maxHeight: "350px" }}>
              <DynamicReactQuill
                placeholder="Write your material here..."
                modules={EditSectionModal.modules}
                formats={EditSectionModal.formats}
                onChange={handleBodyChange}
                value={body}
              />
            </div>
          </Grid>
        </div>
        <div className="flex flex-row mb-3">
          <Grid sm={3} className="flex justify-center items-center">
            <label>Objective</label>
          </Grid>
          <Grid item xs={9} className="flex items-center">
              <TextField
                variant="outlined"
                fullWidth
                required
                margin="dense"
                value={objective}
                onChange={handleObjectiveChange}
              />
            </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="secondary">Delete</Button>
        <Button onClick={onClose} variant="outlined" color="primary">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
};

EditSectionModal.modules = {
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

EditSectionModal.formats = [
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