import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Course from "@/interfaces/course-interface";
import CourseCard from "@/components/userCourse/courseCard";
import { flexbox } from "@mui/system";


interface CourseCardsProps {
  courses: Course[];
}

const CourseCards: React.FC<CourseCardsProps> = ({ courses }) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
          <div style={{ maxWidth: "400px"}} >
            <CourseCard course={course} />
          </div>
        </Grid>
      ))}
      {courses.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h5">No courses found.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CourseCards;