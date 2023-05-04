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

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));
  const [highlightedCar, setHighlightedCar] = useState(null);
  const history = useHistory();
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
  const [searchPageCoords, setSearchPageCoords] = useState("");
  const favorites = useSelector((state) => Object.values(state.favorites));
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (experience) {
      setExperienceType(experience);
      localStorage.removeItem("experience");
    }
  }, [experience]);

  useEffect(() => {
    if (fromDate) {
      setSearchPageFromDate(fromDate);
      localStorage.removeItem("fromDate");
    }
  }, [fromDate]);

  useEffect(() => {
    if (untilDate) {
      setSearchPageUntilDate(untilDate);
      localStorage.removeItem("untilDate");
    }
  }, [untilDate]);

  useEffect(() => {
    if (where) {
      setSearchPageWhere(where);
      localStorage.removeItem("where");
    }
  }, [where]);

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
        setBounds(map.getBounds().toUrlValue());
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
      <SearchLine
        searchPageFromDate={searchPageFromDate}
        setSearchPageFromDate={setSearchPageFromDate}
        searchPageUntilDate={searchPageUntilDate}
        setSearchPageUntilDate={setSearchPageUntilDate}
        searchPageWhere={searchPageWhere}
        setSearchPageWhere={setSearchPageWhere}
        searchPageCoords={searchPageCoords}
        setSearchPageCoords={setSearchPageCoords}
        setBounds={setBounds}
        bounds={bounds}
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
          <p id="yes-results-msg">These cars can be picked up in this area.</p>
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
