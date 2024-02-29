import "./Header.scss";
import SearchBar from "../SearchBar/SearchBar";
import UnitsToggle from "../UnitsToggle/UnitsToggle";

function Header({ updateWeather, setUnits, units }) {
  return (
    <header className="header">
      <SearchBar updateWeather={updateWeather} />
      <UnitsToggle setSelectedUnits={setUnits} selectedUnits={units} />
    </header>
  );
}

export default Header;
