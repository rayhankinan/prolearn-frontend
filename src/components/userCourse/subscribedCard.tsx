import Image from "next/image";
import Course from "@/interfaces/course-interface";
import { Chip, Skeleton } from "@mui/material";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Link from "next/link";
import fileService from "@/services/file-service";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { IconButton, Icon } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface SubcribedCardProps {
  course: Course;
}

const SubcribedCard: React.FC<SubcribedCardProps> = ({ course }) => {
  const imageLoader = ({ src }: { src: string }): string => {
    return `${src}`;
  };

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (course.__thumbnail__) {
      fileService
        .getFile(course.__thumbnail__.id)
        .then((response) => {
          const selectedImage = new File([response.data], "image.png");

          setFile(selectedImage);
        })
        .catch((error) => {
          setFile(null);
        });
    }
  }, []);

  return (
    <Link
      href="/course/[id]/description"
      as={`/course/${course.id}/description`}
    >
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
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem"}}>
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
            <div style={{marginBottom: "17px", marginLeft: "5px"}} className="flex items-center flex-row">
              <StarIcon sx={{ color: "#FFB900" }} />
              <h2 style={{marginLeft: "3px"}}>{course.rating_avg}</h2>
            </div>
          </div>
          <CardActions className="flex items-center justify-center">
            <Button
              size="small"
              variant="contained"
              className="w-64 bg-blue-800 text-white"
              href={`/course/${course.id}/description`}
            >
              Learn Now
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubcribedCard;
