import { RiSearch2Line } from "react-icons/ri";
import "./SearchLine.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const SearchLine = () => {
  const [where, setWhere] = useState("");
  const [coords, setCoords] = useState(null);
  const [flatpickrKey, setFlatpickrKey] = useState(Date.now());
  const history = useHistory();
  const location = useLocation();

  const [validPlace, setValidPlace] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [dateRange, setDateRange] = useState([tomorrow, dayAfter]);
  const urlParams = new URLSearchParams(location.search);
  const existingSearchParams = new URLSearchParams(location.search);
  const locationParams = urlParams.get("location");
  const coordsParams = urlParams.get("coords");
  const datesParam = urlParams.get("dates");
  const defaultCoords = {
    lat: 39.24140288621095,
    lng: -119.42514550357927,
  };

  useEffect(() => {
    if (locationParams) {
      setWhere(locationParams);
      setValidPlace(true);
    }
    if (coordsParams) {
      const coordsArray = coordsParams.split(",");
      const lat = parseFloat(coordsArray[0]);
      const lng = parseFloat(coordsArray[1]);
      setCoords({ lat, lng });
    }
    if (datesParam) {
      const datesArray = datesParam.split(",");
      const fromDate = new Date(datesArray[0].substring(0, 15));
      const untilDate = new Date(datesArray[1].substring(0, 15));
      setDateRange([fromDate, untilDate]);
    }
    setFlatpickrKey(Date.now());
  }, [locationParams, coordsParams, datesParam]);

  const handleOnClose = (selectedDates) => {
    if (selectedDates.length === 2) {
      existingSearchParams.set("dates", selectedDates);
      if (!validPlace) {
        existingSearchParams.set("zoom", 5);
        existingSearchParams.set(
          "coords",
          `${defaultCoords.lat},${defaultCoords.lng}`
        );
      }
      history.push({
        pathname: "/cars",
        search: existingSearchParams.toString(),
      });
    }
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
    setCoords(null);
    if (!address) {
      existingSearchParams.set("location", address);
      history.push({
        pathname: "/cars",
        search: existingSearchParams.toString(),
      });
    }
  };

  const handlePlaceOnSelect = (address) => {
    setWhere(address);
    geocodeByAddress(address)
      .then((results) => {
        if (results && results.length > 0) {
          getLatLng(results[0]).then((latLng) => {
            setCoords(latLng);
            existingSearchParams.set("coords", `${latLng.lat},${latLng.lng}`);
            existingSearchParams.delete("zoom");
            let paramsDatesArr = [];
            if (existingSearchParams.get("dates")) {
              paramsDatesArr = existingSearchParams
                .get("dates")
                .split(",")
                .map((dateStr) =>
                  new Date(dateStr).toLocaleDateString("en-US")
                );
            }
            const dateRangeArr = dateRange.map((date) =>
              date.toLocaleDateString("en-US")
            );
            if (
              paramsDatesArr[0] !== dateRangeArr[0] ||
              paramsDatesArr[1] !== dateRangeArr[1]
            ) {
              existingSearchParams.set("dates", dateRange);
            }
            if (results[0].geometry.viewport) {
              existingSearchParams.set(
                "viewport",
                `${results[0].geometry.viewport.Ha.hi},${results[0].geometry.viewport.Ha.lo}, ${results[0].geometry.viewport.Va.hi}, ${results[0].geometry.viewport.Va.lo}`
              );
            }
            existingSearchParams.set("location", address);
            history.push({
              pathname: "/cars",
              search: existingSearchParams.toString(),
            });
          });
        } else {
          console.error("No results found for the address:", address);
        }
      })
      .catch((error) => console.error("Geocoding error:", error));
    setValidPlace(true);
  };

  const dateSearch = () => {
    const { pathname, search } = window.location;
    if (pathname.startsWith("/cars") && search) {
      return (
        <div id="when-container-line">
          <p>When</p>
          <div id="when-input-container-line">
            <Flatpickr
              key={flatpickrKey}
              className="search-date-line-flatpickr"
              placeholder="Start and end dates for your trip"
              options={{
                dateFormat: "Y-m-d",
                minDate: new Date().fp_incr(1),
                defaultDate: dateRange,
                onChange: handleDateInput,
                onClose: handleOnClose,
                altInput: true,
                altFormat: "F j, Y",
                mode: "range",
              }}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div id="search-line-container">
      <div id="where-container-line">
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
                  placeholder: "Search for a car by location...",
                  className: "search-input-line",
                  id: "where-input-searchline",
                })}
              />
              <div className="suggestions-container">
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
      {dateSearch()}
    </div>
  );
};

export default SearchLine;
