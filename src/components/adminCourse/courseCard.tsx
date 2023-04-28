import { useState, useEffect } from "react";
import Course from "@/interfaces/course-interface";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Box,
  CardActions,
  Skeleton,
} from "@mui/material";
import FileService from "@/services/file-service";
import Image from "next/image";
import { Chip } from "@mui/material"; 

interface CourseCardProps {
  course: Course;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CourseCard = ({ course, handleEdit, handleDelete }: CourseCardProps) => {
  const [file, setFile] = useState<File | null>(null);
  const imageLoader = ({ src }: { src: string }): string => {
    return `${src}`;
  };

  useEffect(() => {
    if (course.__thumbnail__) {
      FileService.getFile(course.__thumbnail__.id).then((response) => {
        const selectedImage = new File([response.data], "image.png");
        setTimeout(() => {
          setFile(selectedImage);
        }, 5000);
        //setFile(selectedImage);
      });
    }
  }, []);

  return (
    <div>
      <Card
        sx={{
          maxWidth: 360,
          borderRadius: "0.5rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #D1D5DB",
          borderColor: "gray.400",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0px 2px 4px rgba(38, 38, 38, 0.2)",
          },
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          {file && (
            <Image
              fill
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://source.unsplash.com/random"
              }
              alt="course thumbnail"
              loader={imageLoader}
              className="absolute top-0 left-0 w-full h-full 
              object-contain rounded object-center py-3 px-3 bg-zinc-100"
            />
          )}
          {!file && (
            <div
              className="absolute top-0 left-0 w-full h-full 
              object-contain rounded object-center py-3 px-3 bg-zinc-100"
            >
              <Skeleton
                className="absolute inset-0 m-auto w-full h-full"
                variant="rectangular"
                width={210}
                height={118}
              />
            </div>
          )}
        </div>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            className="font-bold custom-Montserrat-Bold "
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mb: "1rem",
              maxHeight: 64,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="custom-Montserrat-Bold font-bold"
            sx={{
              maxHeight: 48,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.description}
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
            <Chip
              label={course.difficulty}
              sx={{
                backgroundColor:
                  course.difficulty === "beginner"
                    ? "#E8F5E9"
                    : course.difficulty === "intermediate"
                    ? "#FFFDE7"
                    : "#FFEBEE",
                color:
                  course.difficulty === "beginner"
                    ? "#2E7D32"
                    : course.difficulty === "intermediate"
                    ? "#FFB900"
                    : "#C62828",
                marginRight: "0.5rem",
                marginBottom: "1rem",
              }}
            />
          </div>
        <CardActions className="flex justify-between">
          <Button
            size="small"
            variant="contained"
            color="primary"
            className="w-64 rounded-full"
            onClick={() => handleEdit(course.id!)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            className="w-64 rounded-full"
            onClick={() => handleDelete(course.id!)}
          >
            Delete
          </Button>
        </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCard;
