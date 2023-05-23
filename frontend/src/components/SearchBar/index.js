import { RiSearch2Line } from "react-icons/ri";
import "./SearchBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import flatpickr from "flatpickr";
// import Flatpickr from "flatpickr";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const SearchBar = () => {
  const [where, setWhere] = useState("");
  const [coords, setCoords] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const history = useHistory();

  const handleSearchClick = () => {
    localStorage.setItem("fromDate", from);
    localStorage.setItem("untilDate", until);
    localStorage.setItem("where", where);
    localStorage.setItem("coords", JSON.stringify(coords));
    history.push("/cars/");
  };

  // const handleDateInput = (e) => {
  //   console.log(e.target.value, "val in cal");
  //   setFrom(e.target.value);
  //   if (until === "") {
  //     const nextDay = new Date(e.target.value);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     setUntil(nextDay.toISOString().slice(0, 10));
  //   }
  // };

  const handleDateInput = (selectedDates, dateStr, instance) => {
    if (!selectedDates[0]) return;
    console.log(selectedDates, "selectedDates", dateStr, "dateStr");
    setFrom(selectedDates[0]);
    if (!selectedDates[1]) {
      const nextDay = new Date(selectedDates[0]);
      nextDay.setDate(nextDay.getDate() + 1);
      setUntil(nextDay.toISOString().slice(0, 10));
    } else {
      setUntil(selectedDates[1]);
    }
    console.log(from, "from", until, "until");
  };

  const handleSelect = (address) => {
    setWhere(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoords(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const searchButton = () => {
    if (until && from && until >= from) {
      return (
        <div id="search-button-container" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" />
        </div>
      );
    } else {
      return (
        <div id="search-button-container-inactive">
          <RiSearch2Line id="search-icon" />
        </div>
      );
    }
  };

  return (
    <div id="search-bar-container">
      <div id="where-container">
        <p>Where</p>
        <PlacesAutocomplete
          value={where}
          onChange={(newValue) => setWhere(newValue)}
          onSelect={(address) => handleSelect(address)}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "City, airport, address or hotel",
                  className: "search-input",
                  id: "where-input-searchbar",
                })}
              />
              <div className="suggestions-container-bar">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#eeddf7" : "#ffffff",
                    padding: "10px",
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      {/* <div id="from-container">
        <p>From</p>
        <div id="from-input-container">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="search-input search-date-bar"
            value={from}
            onChange={handleDateInput}
          ></input>
        </div>
      </div> */}
      <div id="when-container">
        <p>When</p>
        <div id="from-input-container">
          <Flatpickr
            className="search-input search-date-bar-flatpickr"
            placeholder="Start and end dates for your trip"
            options={{
              dateFormat: "Y-m-d",
              minDate: new Date().fp_incr(1),
              defaultDate: [new Date().fp_incr(1), new Date().fp_incr(2)],
              onChange: handleDateInput,
              altInput: true,
              altFormat: "F j, Y",
              mode: "range",
            }}
          />
        </div>
      </div>
      {/* <div id="until-container">
        <p>Until</p>
        <div id="until-input-container">
          <input
            type="date"
            min={from}
            className={`search-input search-date-bar${
              until < from ? " date-input-error" : ""
            }`}
            value={until}
            onChange={(e) => setUntil(e.target.value)}
          ></input>
        </div>
      </div> */}
      {searchButton()}
      {/* {!until ||
        !from ||
        (until < from && (
          <div id="search-button-container-inactive">
            <RiSearch2Line id="search-icon" />
          </div>
        ))}
      {until >= from && (
        <div id="search-button-container" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" />
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
