import { Autocomplete, TextField } from "@mui/material";
import React from "react";

type FilterBarProps = {
  categories: { title: string }[],
  handleDifficultyChange: (value: string | null) => void,
};

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  handleDifficultyChange,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories.map((category) => category.title)}
        sx={{ width: 150, height: 10, marginRight: 2 }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo2"
        options={["Beginner", "Intermediate", "Advanced"]}
        sx={{ width: 150, height: 10 }}
        renderInput={(params) => <TextField {...params} label="Difficulty" />}
        onChange={(event, inputValue) =>
          handleDifficultyChange(inputValue || null)
        }
      />
    </div>
  );
};

export default FilterBar;
