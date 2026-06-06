"use client";

import { Autocomplete, TextField } from "@mui/material";

type Props = {
  className?: string;
};

function SearchBar({ className }: Props) {
  return (
    <div className={className}>
      <Autocomplete
        id="Search-bar"
        freeSolo
        options={[]}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
    </div>
  );
}

export default SearchBar;
