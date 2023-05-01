import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Course from "@/interfaces/course-interface";
import SubscribedCard from "@/components/userCourse/subscribedCard";

interface SubscribedCardsProps {
  courses: Course[];
}

const SubscribedCards: React.FC<SubscribedCardsProps> = ({ courses }) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
          <div style={{ maxWidth: "400px" }}>
            <SubscribedCard course={course} />
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

export default SubscribedCards;
