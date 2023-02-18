    import { useState } from "react";
    import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    } from "@mui/material";

    type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (course: {
        id: number;
        name: string;
        description: string;
        img: string;
    }) => void;
    };

    export const AddCourseModal = ({ open, onClose, onSubmit }: ModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImage] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
        const id = Math.random();
        onSubmit({ id, name, description, img });
        setName("");
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
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
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
