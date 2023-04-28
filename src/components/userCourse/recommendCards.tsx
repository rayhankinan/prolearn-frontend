import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Course from "@/interfaces/course-interface";
import RecommendCard from "@/components/userCourse/recommendCard";

interface CourseCardsProps {
  recommendCourses: Course[];
}

const CourseCards: React.FC<CourseCardsProps> = ({
  recommendCourses
}) => {
  return (
    <Grid container spacing={3}>
      {recommendCourses.slice(0,3).map((course) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
          <div style={{ maxWidth: "400px" }}>
            <RecommendCard course={course} />
          </div>
        </Grid>
      ))}
      {recommendCourses.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h5">No courses found.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CourseCards;
