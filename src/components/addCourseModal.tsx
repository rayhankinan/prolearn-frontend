    import { useState } from "react";
        import {
        Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        FormControl,
        InputLabel,
        MenuItem,
        Select,
        TextField,
        SelectChangeEvent,
        } from "@mui/material";
    import { Course } from "@/services/course-service";
    import { Category } from "@/services/course-service";
    


        type ModalProps = {
        open: boolean;
        onClose: () => void;
        onSubmit: (course: Course) => void;
        categories: Category[];
        };

        export const AddCourseModal = ({
        open,
        onClose,
        onSubmit,
        categories,
        }: ModalProps) => {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [imgFile, setImage] = useState<File | null>();
        const [difficulty, setDifficulty] = useState("beginner");
        const [selectedCategories, setSelectedCategories] = useState<Category[]>(
            []
        );

        const handleTitleChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setTitle(event.target.value);
        };

        const handleDescriptionChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setDescription(event.target.value);
        };

        const handleImageChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            console.log(event.target.files);
            const file = event.target.files?.[0];
            setImage(file)
            event.target.value = "";
        };

        const handleDifficultyChange = (
          event: SelectChangeEvent<string>
        ) => {
          setDifficulty(event.target.value as string);
        };

        const handleCategoryChange = (
            event: SelectChangeEvent<string[]>
        ) => {
            const selected = event.target.value
            const selectedCategories = categories.filter((category) =>
            selected.includes(category.title)
            );
            setSelectedCategories(selectedCategories);
        };

        const handleFormSubmit = () => {
  
            const newCourse: Course = {
            title: title,
            description: description,
            imgFile : imgFile,
            difficulty: difficulty,
            __categories__: selectedCategories.map((category) => category.id),
            status: "active",
            };
            onSubmit(newCourse);
            setTitle("");
            setDescription("");
            setImage(null) ;
            setSelectedCategories([]);
            setDifficulty("beginner");
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
              <FormControl fullWidth>
                <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-select-label"
                  id="difficulty-select"
                  value={difficulty}
                  label="Difficulty"
                  onChange={handleDifficultyChange}
                  className="mt-2"
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <input
                  accept="image/*"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </FormControl>
              <FormControl sx={{ minWidth: 200, my: 2 }}>
                <InputLabel id="category-label">Categories</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  multiple
                  value={selectedCategories.map((category) => category.title)}
                  onChange={handleCategoryChange}
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: "200px", overflowY: "auto" },
                    },
                  }}
                  renderValue={(selected: string[]) => (
                    <div
                      style={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {selected.join(", ")}
                    </div>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.title} value={category.title}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleFormSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        );
        };