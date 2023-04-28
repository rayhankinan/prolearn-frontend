import { useState, useEffect } from "react";
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
  Modal,
  Skeleton,
} from "@mui/material";
import Course from "@/interfaces/course-interface";
import Category from "@/interfaces/category-interface";
import ModalFailed from "@/pages/user/modalFailed";
import CourseService from "@/services/course-service";
import FileService from "@/services/file-service";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  course: Course;
};

export const EditCourseModal = ({
  open,
  onClose,
  categories,
  course,
}: ModalProps) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [imgFile, setImage] = useState<File | null>(course.imgFile!);
  const [difficulty, setDifficulty] = useState(course.difficulty);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [titleNameError, setTitleNameError] = useState(false);
  const [descriptionNameError, setDescriptionNameError] = useState(false);
  const [imgNameError, setImgNameError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [courseCategory, setCourseCategory] = useState<Category[]>(
    course.__categories__! as unknown as Category[]
  );
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (course.__thumbnail__ == null) return;
    FileService.getFile(course.__thumbnail__.id)
      .then((response) => {
        const selectedImage = new File([response.data], "image.png");
        setImage(selectedImage);
      })
      .catch((error) => {
        setImage(null);
      });
  }, []);

  useEffect(() => {
    if (courseCategory == null) return;
    const selected = categories.filter((category) =>
      //loop the course.__category__ and check if the id is equal to the category.id
      courseCategory!.some((categories) => categories.id === category.id)
    );
    setSelectedCategories(selected);
  }, []);

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
    if (file) {
      setImage(file);
      setImgNameError(file === null);
    }
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

  const handleFormSubmit = () => {
    const newCourse: Course = {
      title: title,
      description: description,
      imgFile: imgFile,
      difficulty: difficulty,
      rating_avg: course.rating_avg,
      __categories__: selectedCategories.map((category) => category.id),
      status: "active",
    };

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
    if (newCourse.imgFile == null) {
      alert("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("difficulty", newCourse.difficulty);
    formData.append("status", newCourse.status);
    for (let i = 0; i < newCourse.__categories__.length; i++) {
      formData.append("categoryIDs[]", newCourse.__categories__[i].toString());
    }
    formData.append("file", newCourse.imgFile, newCourse.imgFile.name);
    CourseService.update(course.id!, formData)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        {imgFile && (
          <div className="mb-4">
            <img src={URL.createObjectURL(imgFile)} alt="Course Image" />
          </div>
        )}
        {!imgFile && (
          <div className="mb-4">
            <Skeleton variant="rectangular" width={210} height={118} />
          </div>
        )}
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
