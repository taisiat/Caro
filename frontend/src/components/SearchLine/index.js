import { RiSearch2Line } from "react-icons/ri";
import "./SearchLine.css";

const SearchLine = () => {
  return (
    <div id="search-line-container">
      <div id="where-container-line">
        <p>Where</p>
        <input className="search-input-line"></input>
      </div>
      <div id="from-container-line">
        <p>From</p>
        <div id="from-input-container-line">
          <input type="date" className="search-input-line search-date"></input>
          <input type="time" className="search-input-line"></input>
        </div>
      </div>
      <div id="until-container-line">
        <p>Until</p>
        <div id="until-input-container-line">
          <input type="date" className="search-input-line search-date"></input>
          <input type="time" className="search-input-line"></input>
        </div>
      </div>
    </div>
  );
};

export default SearchLine;
