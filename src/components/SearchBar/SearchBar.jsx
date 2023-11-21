import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { Input, Stack } from "@mui/material";
import { useState } from "react";
import { closeIconSX, inputSX, searchBarSX, searchIconSX } from "./styleSX";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: add fetch
    console.log(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      handleSearch();
    }
  };

  const handleInputClear = () => {
    setSearchTerm("");
  };

  return (
    <Stack component="form" sx={searchBarSX}>
      <Input
        sx={inputSX}
        placeholder="Search"
        disableUnderline
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <SearchIcon sx={searchIconSX} />
      {searchTerm.trim() && <CancelIcon sx={closeIconSX} onClick={handleInputClear} />}
    </Stack>
  );
};
