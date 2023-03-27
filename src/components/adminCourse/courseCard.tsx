import { useState, useEffect } from "react";
import Course from "@/interfaces/course-interface";
import { Grid, Card, CardMedia, CardContent, Button, Typography, Box, CardActions, Skeleton} from "@mui/material";
import FileService from "@/services/file-service";


interface CourseCardProps {
  course: Course;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CourseCard= ({
  course,
  handleEdit,
  handleDelete,
} : CourseCardProps) => {

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (course.__thumbnail__){
      FileService.getFile(course.__thumbnail__.id)
      .then((response) => {
        const selectedImage = new File([response.data], "image.png");
        setTimeout(() => {
          setFile(selectedImage);
        }, 5000);
        //setFile(selectedImage);
      })
    }
  }, []);
  return (
    <Grid item key={course.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {file && (
        <CardMedia
          component="img"
          image={
            course.__thumbnail__
              ? `/api/file/${course.__thumbnail__.id}`
              : "https://source.unsplash.com/random"
          }
          alt="random"
          sx={{ height: "300px", objectFit: "cover" }}
        />
        )}
        {!file && (
          <Skeleton variant="rectangular" sx={{ height: "300px" }} />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="font-bold custom-Source-Code-Pro"
          >
            {course.title}
          </Typography>
          <Typography
            className="custom-Source-Code-Pro text-greytext"
            sx={{
              minHeight: "50px",
              maxHeight: "50px",
              overflow: "auto",
            }}
          >
            {course.description}
          </Typography>
        </CardContent>

        <Box
          sx={{
            mt: "auto",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" component="p"></Typography>
          <Typography variant="caption" component="p">
            {course.difficulty.toUpperCase()}
          </Typography>
        </Box>
        <CardActions className="flex justify-between">
          <Button
            size="small"
            variant="contained"
            className="w-64 rounded-full bg-blackbutton text-white"
            onClick={() => handleEdit(course.id!)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            className="w-64 rounded-full bg-redButton text-white"
            onClick={() => handleDelete(course.id!)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CourseCard;
            