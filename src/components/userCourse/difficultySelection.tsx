import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Icon,
} from "@mui/material";
import { Fragment } from "react";

const difficulties = ["Beginner", "Intermediate", "Advanced"];

type Props = {
  difficulty: string;
  setDifficulty: (value: string) => void;
};

const CourseDifficultySelect = ({ difficulty, setDifficulty }: Props) => {
  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    setDifficulty((event.target.value as string).toLowerCase());
  };

  return (
    <Fragment>
      <FormControl sx={{ minWidth: "100%" }}>
        <Select
          labelId="course-difficulty-select-label"
          id="course-difficulty-select"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="rounded-xl"
          IconComponent={() => <Icon className="fas fa-chevron-down" />}
          sx={{
            paddingRight: "1rem",
            "&:after": {
              fontSize: "1rem",
            },
          }}
        >
          <MenuItem key="All Difficulty" value="All Difficulty">
            All Difficulty
          </MenuItem>
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
