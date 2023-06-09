import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarsSearchIndex.css";
import { fetchCars } from "../../store/cars";
import SearchLine from "../SearchLine";
import CarMap from "../CarMap";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";
import CarList from "./CarList";
import FilterForm from "./FilterForm";
import Spinner from "../Spinner";
import noCarsImage from "./no_car_found.png";
import { fetchFavorites } from "../../store/favorites";
import { useLocation } from "react-router-dom";

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));
  const [highlightedCar, setHighlightedCar] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [bounds, setBounds] = useState(null);
  const [minPricing, setMinPricing] = useState(1);
  const [maxPricing, setMaxPricing] = useState(4000);
  const [superhostFilter, setSuperhostFilter] = useState(false);
  const [experienceType, setExperienceType] = useState("all");
  const [searchPageFromDate, setSearchPageFromDate] = useState("");
  const [searchPageUntilDate, setSearchPageUntilDate] = useState("");
  const [searchPageWhere, setSearchPageWhere] = useState("");
  const favorites = useSelector((state) => Object.values(state.favorites));
  const currentSearchParams = new URLSearchParams(window.location.search);
  const urlParams = new URLSearchParams(location.search);
  const experienceParams = urlParams.get("experience");
  const datesParams = urlParams.get("dates");
  const minPricingParams = urlParams.get("minPrice");
  const maxPricingParams = urlParams.get("maxPrice");
  const superhostParams = urlParams.get("superhost");
  const locationParams = urlParams.get("location");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (experienceParams) {
      setExperienceType(experienceParams);
    }
  }, [experienceParams]);

  useEffect(() => {
    if (minPricingParams) {
      setMinPricing(minPricingParams);
    }
  }, [minPricingParams]);

  useEffect(() => {
    if (maxPricingParams) {
      setMaxPricing(maxPricingParams);
    }
  }, [maxPricingParams]);

  useEffect(() => {
    const superhostParamsVal = superhostParams === "true";
    setSuperhostFilter(superhostParamsVal);
  }, [superhostParams]);

  useEffect(() => {
    if (locationParams) {
      setSearchPageWhere(locationParams);
    }
  }, [locationParams]);

  useEffect(() => {
    if (datesParams) {
      const datesArray = datesParams.split(",");
      const fromDate = new Date(datesArray[0].substring(0, 15));
      const untilDate = new Date(datesArray[1].substring(0, 15));
      setSearchPageFromDate(new Date(fromDate));
      setSearchPageUntilDate(new Date(untilDate));
    }
  }, [datesParams]);

  const handleDateChange = (userInputDate) => {
    const dateObj = new Date(Date.parse(userInputDate));
    const utcDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    );
    return utcDate;
  };

  useEffect(() => {
    if (
      minPricing !== undefined &&
      maxPricing !== undefined &&
      bounds &&
      experienceType &&
      (superhostFilter === false || superhostFilter === true) &&
      searchPageFromDate &&
      searchPageUntilDate
    ) {
      dispatch(
        fetchCars({
          minPricing,
          maxPricing,
          bounds,
          superhostFilter: superhostFilter,
          experienceType,
          tripStart: handleDateChange(searchPageFromDate),
          tripEnd: handleDateChange(searchPageUntilDate),
        })
      );
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

  const mapEventHandlers = useMemo(
    () => ({
      click: (event) => {
        const search = new URLSearchParams(event.latLng.toJSON()).toString();
      },
      idle: (map) => {
        const newBounds = map.getBounds().toUrlValue();
        if (newBounds !== bounds) {
          setBounds(newBounds);
        }
      },
    }),
    [history]
  );

  if (!cars) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div id="car-index-container">
      <SearchLine />
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
      </div>

      <div id="car-search-summary">
        <h2>{`${cars ? cars.length : 0} ${
          cars.length === 1 ? "car" : "cars"
        } available`}</h2>
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
          <p id="yes-results-msg">These cars can be picked up in this area.</p>
        )}
      </div>
      <div id="map-container">
        <CarMap
          cars={cars}
          mapEventHandlers={mapEventHandlers}
          markerEventHandlers={{
            click: (car) =>
              history.push({
                pathname: `/cars/${car.id}`,
                search: currentSearchParams.toString(),
              }),
            mouseover: (car) => setHighlightedCar(car.id),
            mouseout: () => setHighlightedCar(null),
          }}
          highlightedCar={highlightedCar}
        />
      </div>
      <div id="car-tile-container">
        <CarList
          cars={cars}
          highlightedCar={highlightedCar}
          setHighlightedCar={setHighlightedCar}
          favorites={favorites}
          searchPageFromDate={searchPageFromDate}
          searchPageUntilDate={searchPageUntilDate}
        />
      </div>
    </div>
  );
}

export default CarsSearchIndex;
