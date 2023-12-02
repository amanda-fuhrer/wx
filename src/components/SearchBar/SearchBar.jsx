import "./SearchBar.scss";
import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";

function SearchBar({ updateWeather }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateWeather(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="search">
      <img src={searchIcon} alt="search icon" className="search__icon" />
      <input
        type="text"
        aria-label="Search"
        className="search__bar"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
