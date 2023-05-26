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

const SearchLine = (
  {
    // searchPageFromDate,
    // setSearchPageFromDate,
    // searchPageUntilDate,
    // setSearchPageUntilDate,
    // searchPageWhere,
    // setSearchPageWhere,
  }
) => {
  const [where, setWhere] = useState("");
  const [coords, setCoords] = useState("");
  const [flatpickrKey, setFlatpickrKey] = useState(Date.now());

  // const [from, setFrom] = useState("");
  // const [until, setUntil] = useState("");
  const history = useHistory();
  const location = useLocation();

  const [validPlace, setValidPlace] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  // const [from, setFrom] = useState(tomorrow);
  // const [until, setUntil] = useState(dayAfter);
  const [from, setFrom] = useState(tomorrow);
  const [until, setUntil] = useState(dayAfter);
  // useEffect(() => {
  //   if (searchPageFromDate) {
  //     setFrom(searchPageFromDate);
  //   }
  // }, [searchPageFromDate]);

  // useEffect(() => {
  //   if (searchPageUntilDate) {
  //     setUntil(searchPageUntilDate);
  //   }
  // }, [searchPageUntilDate]);

  // useEffect(() => {
  //   if (searchPageWhere) {
  //     setWhere(searchPageWhere);
  //   }
  // }, [searchPageWhere]);
  const urlParams = new URLSearchParams(location.search);
  const searchParams = new URLSearchParams();
  const existingSearchParams = new URLSearchParams(location.search);

  const locationParams = urlParams.get("location");
  const coordsParams = urlParams.get("coords");
  const datesParam = urlParams.get("dates");

  // useEffect(() => {
  //   // const searchParams = new URLSearchParams();

  //   if (!datesParam) {
  //     console.log("no dates!", from, until);
  //     existingSearchParams.set("dates", `${from},${until}`);
  //     // history.push(`${location.pathname}?${searchParams.toString()}`);
  //     history.push({
  //       pathname: "/cars",
  //       search: existingSearchParams.toString(),
  //     });
  //   }
  // }, [datesParam]);

  useEffect(() => {
    // const urlParams = new URLSearchParams(location.search);
    // const locationParams = urlParams.get("location");
    if (locationParams) {
      setWhere(locationParams);
      setValidPlace(true);
    }

    // const coordsParams = urlParams.get("coords");
    if (coordsParams) {
      const coordsArray = coordsParams.split(",");
      const lat = parseFloat(coordsArray[0]);
      const lng = parseFloat(coordsArray[1]);
      setCoords([lat, lng]);
    }
    // const datesParam = urlParams.get("dates");
    // console.log("datesParam:", datesParam);

    if (datesParam) {
      // const [fromDate, untilDate] = datesParam.split(",");
      const datesArray = datesParam.split(",");
      const fromDate = new Date(datesArray[0].substring(0, 15));
      const untilDate = new Date(datesArray[1].substring(0, 15));
      setFrom(new Date(fromDate));
      setUntil(new Date(untilDate));
      // console.log(fromDate, untilDate, "dates", from, "from", until, "until");
    }
    // else {
    //   existingSearchParams.set("dates", `${from},${until}`);
    //   history.push({
    //     pathname: "/cars",
    //     search: existingSearchParams.toString(),
    //   });
    // }
    setFlatpickrKey(Date.now());
  }, [location.search]);

  // useEffect(() => {
  //   console.log("from:", from);
  //   console.log("until:", until);
  // }, [from, until]);

  // const handleSearchClick = () => {
  //   if (location.pathname.match(/^\/cars\/?$|^(?!\/cars\/\d)\/cars\/\?.*/)) {
  //     setSearchPageFromDate(from);
  //     setSearchPageUntilDate(until);
  //     setSearchPageWhere(where);
  //     history.push(`/cars?coords=${coords.lat},${coords.lng}`);
  //   } else {
  //     localStorage.setItem("fromDate", from);
  //     localStorage.setItem("untilDate", until);
  //     localStorage.setItem("where", where);
  //     localStorage.setItem("coords", JSON.stringify(coords));
  //     history.push("/cars/");
  //   }
  // };

  // useEffect(() => {
  //   setFlatpickrKey(Date.now());
  // }, [until]);

  // const handleSearchClick = () => {
  //   // const searchParams = new URLSearchParams();
  //   if (coords) {
  //     searchParams.set("coords", `${coords.lat},${coords.lng}`);
  //     searchParams.set("location", where);
  //   } else {
  //     searchParams.set("coords", "39.24140288621095,-119.42514550357927");
  //     searchParams.set("cityZoom", 15);
  //   }
  //   searchParams.set("dates", `${from},${until}`);
  //   history.push({
  //     pathname: "/cars",
  //     search: searchParams.toString(),
  //   });
  // };

  const handleSearchClick = () => {
    // const searchParams = new URLSearchParams();
    if (coords) {
      existingSearchParams.set("coords", `${coords.lat},${coords.lng}`);
      existingSearchParams.set("location", where);
    } else {
      existingSearchParams.set(
        "coords",
        "39.24140288621095,-119.42514550357927"
      );
      existingSearchParams.set("cityZoom", 15);
    }
    existingSearchParams.set("dates", `${from},${until}`);
    history.push({
      pathname: "/cars",
      search: existingSearchParams.toString(),
    });
  };

  // const handleDateInput = (e) => {
  //   setFrom(e.target.value);
  //   if (until === "") {
  //     const nextDay = new Date(e.target.value);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     setUntil(nextDay.toISOString().slice(0, 10));
  //   }
  // };

  // const handleOnClose = async (selectedDates) => {
  //   // existingSearchParams.set("dates", `${from},${until}`);
  //   // const updatedSearchParams = new URLSearchParams(
  //   //   existingSearchParams.toString()
  //   // );
  //   // updatedSearchParams.set("dates", `${from},${until}`);

  //   // history.push({
  //   //   pathname: "/cars",
  //   //   search: updatedSearchParams.toString(),
  //   // });
  //   await setFrom(selectedDates[0]);
  //   await setUntil(selectedDates[1]);
  //   existingSearchParams.set("dates", `${from},${until}`);

  //   history.push({
  //     pathname: "/cars",
  //     search: existingSearchParams.toString(),
  //   });

  //   // existingSearchParams.set("dates", `${from},${until}`);
  //   // history.push({
  //   //   pathname: "/cars",
  //   //   search: existingSearchParams.toString(),
  //   // });
  // };

  const handleDateInput = (selectedDates) => {
    if (!selectedDates[0]) return;
    setFrom(selectedDates[0]);
    setUntil(selectedDates[1]);
  };

  // useEffect(() => {
  //   if (until) {
  //     existingSearchParams.set("dates", `${from},${until}`);
  //     history.push({
  //       pathname: "/cars",
  //       search: existingSearchParams.toString(),
  //     });
  //   }
  // }, [until]);

  // const handleSelect = (address) => {
  //   setWhere(address);
  //   geocodeByAddress(address)
  //     .then((results) => getLatLng(results[0]))
  //     .then((latLng) => {
  //       setCoords(latLng);
  //     })
  //     .catch((error) => console.error("Error", error));
  // };

  const handlePlaceOnChange = (address) => {
    setWhere(address);
    setValidPlace(false);
  };

  const handlePlaceOnSelect = (address) => {
    setWhere(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoords(latLng);
      })
      .catch((error) => console.error("Error", error));
    setValidPlace(true);
  };

  const searchButton = () => {
    if (until && from && until >= from && (validPlace || where === "")) {
      return (
        <div id="search-button-container-line" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      );
    } else {
      return (
        <div id="search-button-container-line-inactive">
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      );
    }
  };

  return (
    <div id="search-line-container">
      <div id="where-container-line">
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
                  placeholder: "Location... or, search everywhere",
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
      {/* <div id="from-container-line">
        <p>From</p>
        <div id="from-input-container-line">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="search-input-line search-date"
            value={from}
            onChange={handleDateInput}
          ></input>
        </div>
      </div>
      <div>
        <div id="until-container-line">
          <p>Until</p>
          <div id="until-input-container-line">
            <input
              type="date"
              min={from}
              className={`search-input-line search-date${
                until < from ? " date-input-error" : ""
              }`}
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            ></input>
          </div>
        </div>
      </div> */}
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
              defaultDate: [from, until],
              onChange: handleDateInput,
              // onClose: handleOnClose,
              altInput: true,
              altFormat: "F j, Y",
              mode: "range",
              // onReady: function (selectedDates, dateStr, instance) {
              // instance.setDate([from, until]);
              // },
            }}
          />
        </div>
      </div>
      {searchButton()}
      {/* {until < from && (
        <div id="search-button-container-line-inactive">
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      )}
      {until >= from && (
        <div id="search-button-container-line" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      )} */}
    </div>
  );
};

export default SearchLine;
