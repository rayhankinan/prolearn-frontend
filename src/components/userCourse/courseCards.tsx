import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Course from "@/interfaces/course-interface";
import CourseCard from "@/components/userCourse/courseCard";
import SubscribedCard from "@/components/userCourse/subscribedCard";

interface CourseCardsProps {
  courses: Course[];
  subscribedCourses: number[];
  isLoggedIn: boolean;
}

const CourseCards: React.FC<CourseCardsProps> = ({
  courses,
  subscribedCourses,
  isLoggedIn,
}) => {
  console.log(isLoggedIn);
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
          <div style={{ maxWidth: "400px" }}>
            {course.id ? (
              subscribedCourses.includes(course.id) ? (
                <SubscribedCard course={course} />
              ) : (
                <CourseCard course={course} isLoggedIn={isLoggedIn}/>
              )
            ) : (
              <CourseCard course={course} isLoggedIn={isLoggedIn} />
            )}
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
