import { Autocomplete, TextField } from "@mui/material";
import React from "react";

type FilterBarProps = {
  categories: { title: string }[];
  handleDifficultyChange: (value: string | null) => void;
  handleCategoryChange: (value: string[]) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  handleDifficultyChange,
  handleCategoryChange,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Autocomplete
        multiple
        id="combo-box-demo"
        options={categories.map((category) => category.title)}
        sx={{ width: 350, marginRight: 2 }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
        onChange={(_, inputValue) => handleCategoryChange(inputValue || [])}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo2"
        options={["Beginner", "Intermediate", "Advanced"]}
        sx={{ width: 350, height: 10 }}
        renderInput={(params) => <TextField {...params} label="Difficulty" />}
        onChange={(_, inputValue) => handleDifficultyChange(inputValue || null)}
      />
    </div>
  );
};

export default FilterBar;
