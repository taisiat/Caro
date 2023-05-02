import { RiSearch2Line } from "react-icons/ri";
import "./SearchLine.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchLine = () => {
  const [where, setWhere] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const history = useHistory();

  // const handleSearchClick = () => {
  //   localStorage.setItem("fromDate", JSON.stringify(from));
  //   localStorage.setItem("untilDate", JSON.stringify(until));
  //   localStorage.setItem("where", JSON.stringify(where));
  //   history.push("/cars/");
  // };

  // const handleWhereInput = (e) => {
  //   setWhere(e.target.value);
  //   handleSearchClick();
  // };

  // const handleEndDateInput = (e) => {
  //   setUntil(e.target.value);
  //   handleSearchClick();
  // };

  // const handleStartDateInput = (e) => {
  //   setFrom(e.target.value);
  //   if (until === "") {
  //     const nextDay = new Date(e.target.value);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     setUntil(nextDay.toISOString().slice(0, 10));
  //   }
  //   handleSearchClick();
  // };
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
    <div id="search-line-container">
      <div id="where-container-line">
        <p>Where</p>
        <input
          className="search-input-line"
          id="where-input-searchline"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        ></input>
      </div>
      <div id="from-container-line">
        <p>From</p>
        <div id="from-input-container-line">
          <input
            type="date"
            className="search-input-line search-date"
            value={from}
            onChange={handleDateInput}
          ></input>
          {/* <input type="time" className="search-input-line"></input> */}
        </div>
      </div>
      <div id="until-container-line">
        <p>Until</p>
        <div id="until-input-container-line">
          <input
            type="date"
            className="search-input-line search-date"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
          ></input>
          {/* <input type="time" className="search-input-line"></input> */}
        </div>
      </div>
      <div id="search-button-container-line" onClick={handleSearchClick}>
        <RiSearch2Line id="search-icon" className="search-line-button" />
      </div>
    </div>
  );
};

export default SearchLine;
