import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Fragment } from "react";

const difficulties = ["Beginner", "Intermediate", "Advanced"];

const CourseDifficultySelect = () => {
  const [difficulty, setDifficulty] = useState(" ");

  const handleDifficultyChange = (
    event: SelectChangeEvent<string>
  ) => {
    setDifficulty(event.target.value as string);
  };

  return (
    <Fragment>
      <FormControl sx={{ minWidth: "250px" }}>
        <Select
          labelId="course-difficulty-select-label"
          id="course-difficulty-select"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          {difficulties.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default CourseDifficultySelect;
