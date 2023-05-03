import { RiSearch2Line } from "react-icons/ri";
import "./SearchBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [where, setWhere] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const history = useHistory();

  const handleSearchClick = () => {
    localStorage.setItem("fromDate", from);
    localStorage.setItem("untilDate", until);
    localStorage.setItem("where", where);
    history.push("/cars/");
  };

  const handleDateInput = (e) => {
    setFrom(e.target.value);
    if (until === "") {
      const nextDay = new Date(e.target.value);
      nextDay.setDate(nextDay.getDate() + 1);
      setUntil(nextDay.toISOString().slice(0, 10));
    }
  };

  return (
    <div id="search-bar-container">
      <div id="where-container">
        <p>Where</p>
        <input
          placeholder="City, airport, address or hotel"
          className="search-input"
          id="where-input-searchbar"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        ></input>
      </div>
      <div id="from-container">
        <p>From</p>
        <div id="from-input-container">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="search-input search-date"
            value={from}
            onChange={handleDateInput}
          ></input>
          {/* <input type="time" className="search-input"></input> */}
        </div>
      </div>
      <div id="until-container">
        <p>Until</p>
        <div id="until-input-container">
          <input
            type="date"
            min={from}
            // className="search-input search-date"
            className={`search-input search-date${
              until < from ? " date-input-error" : ""
            }`}
            value={until}
            onChange={(e) => setUntil(e.target.value)}
          ></input>
          {/* <input type="time" className="search-input"></input> */}
        </div>
      </div>
      {/* <div id="search-button-container" onClick={handleSearchClick}>
        <RiSearch2Line id="search-icon" />
      </div> */}
      {until < from && (
        <div id="search-button-container-inactive">
          <RiSearch2Line id="search-icon" />
        </div>
      )}
      {until >= from && (
        <div id="search-button-container" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
