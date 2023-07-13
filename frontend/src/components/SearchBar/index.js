import { RiSearch2Line } from "react-icons/ri";
import "./SearchBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const SearchBar = () => {
  const [where, setWhere] = useState("");
  const [coords, setCoords] = useState("");
  const history = useHistory();
  const [validPlace, setValidPlace] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [dateRange, setDateRange] = useState([tomorrow, dayAfter]);

  const defaultCoords = {
    lat: 39.24140288621095,
    lng: -119.42514550357927,
  };
  const searchParams = new URLSearchParams();
  const [results, setResults] = useState(null);

  const handleSearchClick = () => {
    if (coords && JSON.stringify(coords) !== JSON.stringify(defaultCoords)) {
      searchParams.set("coords", `${coords.lat},${coords.lng}`);
      searchParams.set("location", where);
      if (results) {
        searchParams.set(
          "viewport",
          `${results.geometry.viewport.Ha.hi},${results.geometry.viewport.Ha.lo}, ${results.geometry.viewport.Va.hi}, ${results.geometry.viewport.Va.lo}`
        );
      }
      searchParams.delete("zoom");
    } else {
      searchParams.set("coords", `${defaultCoords.lat},${defaultCoords.lng}`);
      searchParams.set("zoom", 5);
    }
    searchParams.set("dates", dateRange);
    history.push({
      pathname: "/cars",
      search: searchParams.toString(),
    });
  };

  const handleDateInput = (selectedDates) => {
    if (selectedDates.length < 2) {
      return;
    } else if (selectedDates.length === 2) {
      setDateRange(selectedDates);
    }
  };

  const handlePlaceOnChange = (address) => {
    setWhere(address);
    setValidPlace(false);
  };

  const handlePlaceOnSelect = (address) => {
    setWhere(address);
    geocodeByAddress(address)
      .then((results) => {
        if (results && results.length > 0) {
          getLatLng(results[0]).then((latLng) => {
            setCoords(latLng);
            setResults(results[0]);
          });
        } else {
          console.error("No results found for the address:", address);
        }
      })
      .catch((error) => console.error("Geocoding error:", error));
    setValidPlace(true);
  };

  const searchButton = () => {
    if (dateRange.length === 2 && (validPlace || where === "")) {
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
      <div id="when-container">
        <p>When</p>
        <div id="from-input-container">
          <Flatpickr
            className="search-input search-date-bar-flatpickr"
            placeholder="Start and end dates for your trip"
            options={{
              dateFormat: "Y-m-d",
              minDate: new Date().fp_incr(1),
              defaultDate: dateRange,
              onChange: handleDateInput,
              altInput: true,
              altFormat: "F j, Y",
              mode: "range",
            }}
          />
        </div>
      </div>
      {searchButton()}
    </div>
  );
};

export default SearchBar;
