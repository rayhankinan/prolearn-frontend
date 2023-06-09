import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { SelectChangeEvent } from "@mui/material";
import Course from "@/interfaces/course-interface";
import Category from "@/interfaces/category-interface";
import ModalFailed from "@/pages/user/modalFailed";
import CategoryService from "@/services/category-service";
import categoryService from "@/services/category-service";

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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [titleNameError, setTitleNameError] = useState(false);
  const [descriptionNameError, setDescriptionNameError] = useState(false);
  const [imgNameError, setImgNameError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleNameError(event.target.value === "");
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    setDescriptionNameError(event.target.value === "");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
    setImgNameError(file === null);
  };

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    setDifficulty(event.target.value as string);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value;
    const selectedCategories = categories.filter((category) =>
      selected.includes(category.title)
    );
    setSelectedCategories(selectedCategories);
  };

  const handleAddCategory = () => {
    // const newCategoryString = newCategory as string;
    categoryService.create({ title: newCategory })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      setErrorMessage(err.message);
    });
    

  };

  const handleFormSubmit = () => {
    const newCourse: Course = {
      title: title,
      description: description,
      imgFile: imgFile,
      difficulty: difficulty,
      rating_avg: 0,
      __categories__: selectedCategories.map((category) => category.id),
      status: "active",
    };
    onSubmit(newCourse);
    setSelectedCategories([]);
    if (title === "" || description === "" || imgFile === null) {
      if (selectedCategories.length === 0 || difficulty === "") {
        setModalOpen(true);
        setErrorMessage("Please fill in all the required fields");
        setTitleNameError(true);
        setDescriptionNameError(true);
        setImgNameError(true);
        return;
      }
    }
    if (titleNameError || descriptionNameError || imgNameError) {
      setModalOpen(true);
      setErrorMessage("Please fill in all the required fields");
      return;
    }
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
          error={titleNameError}
          helperText={titleNameError ? "Title is required" : ""}
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
          error={descriptionNameError}
          helperText={descriptionNameError ? "Description is required" : ""}
        />
        <TextField
          margin="dense"
          id="new-category"
          label="New category"
          type="text"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="mt-2"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!newCategory}
          onClick={() => {
            const newCategoryObj = {
              id: categories.length + 1,
              title: newCategory,
              total_course : 0,
            };
            categories.push(newCategoryObj);
            handleAddCategory();
            setNewCategory("");
          }}
          className="mb-3 bg-green-500 hover:bg-green-500/opacity-80"
        >
          Add
        </Button>
        <FormControl sx={{ marginTop: "10px" }} fullWidth>
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-select-label"
            id="difficulty-select"
            value={difficulty}
            label="Difficulty"
            onChange={handleDifficultyChange}
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
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <ModalFailed
            open={modalOpen}
            onClose={handleCloseModal}
            error={errorMessage}
          />
        </Modal>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
