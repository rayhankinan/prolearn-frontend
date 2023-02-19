    import { useState } from "react";
    import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    } from "@mui/material";

    import { Course } from "@/services/course-service";

    type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (course: Course) => void;
    };

    export const AddCourseModal = ({ open, onClose, onSubmit }: ModalProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImage] = useState("");

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImage(file ? URL.createObjectURL(file) : "");
    };

    const handleFormSubmit = () => {
        const newCourse: Course = {
        id: Math.random(),
        title: title,
        description: description,
        img: img,
        difficulty: "",
        categoryIDs: [],
        status: "",
        };
        onSubmit(newCourse);
        setTitle("");
        setDescription("");
        setImage("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="Title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            />
            <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            />
            <input
            accept="image/*"
            id="image"
            type="file"
            onChange={handleImageChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleFormSubmit}>Save</Button>
        </DialogActions>
        </Dialog>
    );
    };
