import { RiSearch2Line } from "react-icons/ri";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div id="search-bar-container">
      <div id="where-container">
        <p>Where</p>
        <input
          placeholder="City, airport, address or hotel"
          className="search-input"
        ></input>
      </div>
      <div className="search-divider"></div>
      <div id="from-container">
        <p>From</p>
        <div id="from-input-container">
          <input type="date" className="search-input"></input>
          <input type="time" className="search-input"></input>
        </div>
      </div>
      <div className="search-divider"></div>
      <div id="until-container">
        <p>Until</p>
        <div id="until-input-container">
          <input type="date" className="search-input"></input>
          <input type="time" className="search-input"></input>
        </div>
      </div>
      <div id="search-button-container">
        <RiSearch2Line />
      </div>
    </div>
  );
};

export default SearchBar;
