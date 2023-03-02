import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Course } from "@/services/course-service";
import CourseCard from "@/pages/user/courseCard";

interface CourseCardsProps {
  courses: Course[];
}

const CourseCards: React.FC<CourseCardsProps> = ({ courses }) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
          <CourseCard course={course} />
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