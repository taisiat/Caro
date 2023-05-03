import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarsSearchIndex.css";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import { fetchCars } from "../../store/cars";
import SearchLine from "../SearchLine";
import { IoOptionsOutline } from "react-icons/io5";
import CarSearchIndexItem from "../CarSearchIndexItem";
import { Redirect } from "react-router-dom";
import CarMap from "../CarMap";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";
import CarList from "./CarList";
import FilterForm from "./FilterForm";
import Spinner from "../Spinner";
import noCarsImage from "./no_car_found.png";
import { fetchFavorites } from "../../store/favorites";

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));
  const [highlightedCar, setHighlightedCar] = useState(null);
  const history = useHistory();
  //   const cityCoords = localStorage.getItem("cityCoords");
  //   const cityZoom = localStorage.getItem("cityZoom");
  const experience = localStorage.getItem("experience");
  const fromDate = localStorage.getItem("fromDate");
  const untilDate = localStorage.getItem("untilDate");
  const where = localStorage.getItem("where");
  const [bounds, setBounds] = useState(null);
  const [minPricing, setMinPricing] = useState(1);
  const [maxPricing, setMaxPricing] = useState(4000);
  const [superhostFilter, setSuperhostFilter] = useState(false);
  const [experienceType, setExperienceType] = useState("");
  const [searchPageFromDate, setSearchPageFromDate] = useState("");
  const [searchPageUntilDate, setSearchPageUntilDate] = useState("");
  const [searchPageWhere, setSearchPageWhere] = useState("");
  //   const mapOptions = {};
  const favorites = useSelector((state) => Object.values(state.favorites)); //heartsedit add favs here
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]); //heartsedit add favs here

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     setSearchPageFromDate(localStorage.getItem("fromDate"));
  //     setSearchPageUntilDate(localStorage.getItem("untilDate"));
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    if (experience) {
      setExperienceType(experience);
      //   console.log("experience!", experience, experienceType, "exp type");
      localStorage.removeItem("experience");
      //   localStorage.clear();
    }
  }, [experience]);

  useEffect(() => {
    if (fromDate) {
      setSearchPageFromDate(fromDate);
      localStorage.removeItem("fromDate");
      //   localStorage.clear();
    }
  }, [fromDate]);

  useEffect(() => {
    if (untilDate) {
      setSearchPageUntilDate(untilDate);
      console.log("untilDate", untilDate);
      localStorage.removeItem("untilDate");
      //   localStorage.clear();
    }
  }, [untilDate]);

  useEffect(() => {
    if (where) {
      setSearchPageWhere(where);
      console.log("where", where);

      localStorage.removeItem("where");
      //   localStorage.clear();
    }
  }, [where]);

  //   useEffect(() => {
  //     if (cityCoords) {
  //       //   mapOptions.center = JSON.parse(cityCoords);
  //       //   mapOptions.zoom = JSON.parse(cityZoom);
  //       mapOptions.center = cityCoords;
  //       mapOptions.zoom = cityZoom;
  //       localStorage.clear();
  //     }
  //   }, [cityCoords]);

  const handleDateChange = (userInputDate) => {
    const dateObj = new Date(Date.parse(userInputDate));
    const utcDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    );
    return utcDate;
  };

  useEffect(() => {
    if (minPricing && maxPricing && bounds) {
      dispatch(
        fetchCars({
          minPricing,
          maxPricing,
          bounds,
          superhostFilter,
          experienceType,
          tripStart: handleDateChange(searchPageFromDate),
          tripEnd: handleDateChange(searchPageUntilDate),
        })
      ); // add superhost and dates
      //   dispatch(fetchCars({ bounds }));
    }
  }, [
    minPricing,
    maxPricing,
    bounds,
    superhostFilter,
    experienceType,
    searchPageFromDate,
    searchPageUntilDate,
    dispatch,
  ]);

  //   useEffect(() => {
  //     dispatch(fetchCars());
  //   }, [dispatch]);

  const mapEventHandlers = useMemo(
    () => ({
      click: (event) => {
        const search = new URLSearchParams(event.latLng.toJSON()).toString();
        // history.push({ pathname: "/cars/new", search });
      },
      idle: (map) => {
        setBounds(map.getBounds().toUrlValue());
      },
    }),
    [history]
  );

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  if (!cars) {
    return (
      <>
        {/* <img src="./no_car_found.png" alt="no cars found"></img> */}
        <Spinner />
      </>
    );
  }

  return (
    <div id="car-index-container">
      <SearchLine
        searchPageFromDate={searchPageFromDate}
        setSearchPageFromDate={setSearchPageFromDate}
        searchPageUntilDate={searchPageUntilDate}
        setSearchPageUntilDate={setSearchPageUntilDate}
        searchPageWhere={searchPageWhere}
        setSearchPageWhere={setSearchPageWhere}
      />
      <div id="search-buttons">
        <FilterForm
          minPricing={minPricing}
          maxPricing={maxPricing}
          superhostFilter={superhostFilter}
          experienceType={experienceType}
          setMinPricing={setMinPricing}
          setMaxPricing={setMaxPricing}
          setSuperhostFilter={setSuperhostFilter}
          setExperienceType={setExperienceType}
        />
        {/* <button>
          <p>Sort by</p>
        </button>
        <button>
          <p>Price</p>
        </button>
        <button>
          <p>
            <IoOptionsOutline /> More filters
          </p>
        </button> */}
      </div>

      <div id="car-search-summary">
        <h2>{`${cars ? cars.length : 0} cars available`}</h2>
        {cars.length === 0 && (
          <div id="no-results-container">
            <img
              src={noCarsImage}
              alt="no cars found"
              id="zero-search-result-img"
            ></img>
            <p id="no-results-msg">
              Try changing your filters or exploring the map around Caro's
              destination cities: Seattle, San Francisco, and Las Vegas
            </p>
          </div>
        )}
        {cars.length !== 0 && (
          <p id="yes-results-msg">These cars can be picked up in this city.</p>
        )}
      </div>
      <div id="map-container">
        <CarMap
          cars={cars}
          mapEventHandlers={mapEventHandlers}
          markerEventHandlers={{
            click: (car) => history.push(`/cars/${car.id}`),
            mouseover: (car) => setHighlightedCar(car.id),
            mouseout: () => setHighlightedCar(null),
          }}
          highlightedCar={highlightedCar}
          //   mapOptions={mapOptions}
        />
      </div>
      <div id="car-tile-container">
        {/* {cars.map((car, idx) => (
          <CarSearchIndexItem key={idx} className="car-tile" car={car} />
        ))} */}
        <CarList
          cars={cars}
          highlightedCar={highlightedCar}
          setHighlightedCar={setHighlightedCar}
          favorites={favorites} //heartsedit add favs here
          searchPageFromDate={searchPageFromDate}
          searchPageUntilDate={searchPageUntilDate}
        />
      </div>
    </div>
  );
}

export default CarsSearchIndex;
