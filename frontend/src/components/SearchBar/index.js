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
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchBar = () => {
  const [where, setWhere] = useState("");
  const [coords, setCoords] = useState("");
  // const [from, setFrom] = useState(new Date().fp_incr(1));
  // const [until, setUntil] = useState(new Date().fp_incr(2));
  const history = useHistory();
  const location = useLocation();

  const [validPlace, setValidPlace] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [from, setFrom] = useState(tomorrow);
  const [until, setUntil] = useState(dayAfter);
  const defaultCoords = {
    lat: 39.24140288621095,
    lng: -119.42514550357927,
  };
  const searchParams = new URLSearchParams();
  const [results, setResults] = useState(null);

  // const handleSearchClick = () => {
  //   localStorage.setItem("fromDate", from);
  //   localStorage.setItem("untilDate", until);
  //   localStorage.setItem("where", where);
  //   localStorage.setItem("coords", JSON.stringify(coords));
  //   history.push("/cars/");
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   if (urlParams.get("location")) {
  //     setWhere(urlParams.get("location"));
  //   }
  //   if (urlParams.get("dates")) {
  //     const dates = urlParams.get("dates").split(",");
  //     setFrom(dates[0]);
  //     setUntil(dates[1]);
  //   }
  // }, [location]);

  const handleSearchClick = () => {
    // const searchParams = new URLSearchParams();
    // if (coords) {
    if (coords && JSON.stringify(coords) !== JSON.stringify(defaultCoords)) {
      // searchParams.set("coords", `${coords.lat},${coords.lng}`);
      // searchParams.set("location", where);
      // searchParams.set("zoom", 15);
      searchParams.set("coords", `${coords.lat},${coords.lng}`);
      searchParams.set("location", where);
      if (results) {
        searchParams.set(
          "viewport",
          `${results.geometry.viewport.Ha.hi},${results.geometry.viewport.Ha.lo}, ${results.geometry.viewport.Ua.hi}, ${results.geometry.viewport.Ua.lo}`
        );
      }
      searchParams.delete("zoom");
    } else {
      searchParams.set("coords", `${defaultCoords.lat},${defaultCoords.lng}`);
      // searchParams.set("cityZoom", 15);
      // searchParams.set("zoom", 15);
      searchParams.set("zoom", 5);
    }
    searchParams.set("dates", `${from},${until}`);
    history.push({
      pathname: "/cars",
      search: searchParams.toString(),
    });
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
    // if (!selectedDates[1]) {
    //   const nextDay = new Date(selectedDates[0]);
    //   nextDay.setDate(nextDay.getDate() + 1);
    //   setUntil(nextDay.toISOString().slice(0, 10));
    // } else {
    setUntil(selectedDates[1]);
    // }
    console.log(from, "from", until, "until");
  };

  const handlePlaceOnChange = (address) => {
    setWhere(address);
    setValidPlace(false);
  };

  const handlePlaceOnSelect = (address) => {
    setWhere(address);
    // geocodeByAddress(address)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => {
    //     setCoords(latLng);
    //     searchParams.set("coords", `${latLng.lat},${latLng.lng}`);
    //     // existingSearchParams.delete("zoom");
    //     // existingSearchParams.set("dates", dateRange);
    //     if (results[0].geometry.viewport) {
    //       searchParams.set(
    //         "viewport",
    //         `${results[0].geometry.viewport.Ha.hi},${results[0].geometry.viewport.Ha.lo}, ${results[0].geometry.viewport.Ua.hi}, ${results[0].geometry.viewport.Ua.lo}`
    //       );
    //     }
    //     searchParams.set("location", address);
    //   })
    //   .catch((error) => console.error("Error", error));
    // setValidPlace(true);
    geocodeByAddress(address)
      .then((results) => {
        console.log("Geocoding results:", results);
        if (results && results.length > 0) {
          getLatLng(results[0]).then((latLng) => {
            setCoords(latLng);
            setResults(results[0]);
            console.log(latLng, "latLng", coords, "coords");
            // searchParams.set("coords", `${latLng.lat},${latLng.lng}`);
            // searchParams.delete("zoom");
            // searchParams.set("dates", dateRange);
            // if (results[0].geometry.viewport) {
            //   searchParams.set(
            //     "viewport",
            //     `${results[0].geometry.viewport.Ha.hi},${results[0].geometry.viewport.Ha.lo}, ${results[0].geometry.viewport.Ua.hi}, ${results[0].geometry.viewport.Ua.lo}`
            //   );
            // }
            // searchParams.set("location", address);
            // history.push({
            //   pathname: "/cars",
            //   search: searchParams.toString(),
            // });
          });

          // Push the new location to history
        } else {
          // Handle no results found case
          console.error("No results found for the address:", address);
        }
      })
      .catch((error) => console.error("Geocoding error:", error));
    setValidPlace(true);
  };

  const searchButton = () => {
    if (until && from && until >= from && (validPlace || where === "")) {
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
          // onChange={(newValue) => setWhere(newValue)}
          // onSelect={(address) => handleSelect(address)}
          onChange={(address) => handlePlaceOnChange(address)}
          onSelect={(address) => handlePlaceOnSelect(address)}
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
                  placeholder:
                    "City, airport, address or hotel... or, search everywhere",
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
