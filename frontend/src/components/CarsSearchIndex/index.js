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

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));
  const [highlightedCar, setHighlightedCar] = useState(null);
  const history = useHistory();
  const [bounds, setBounds] = useState(null);
  const [minPricing, setMinPricing] = useState(1);
  const [maxPricing, setMaxPricing] = useState(100000);
  const [superhostFilter, setSuperhostFilter] = useState(false);

  useEffect(() => {
    if (minPricing && maxPricing && bounds) {
      dispatch(fetchCars({ minPricing, maxPricing, bounds, superhostFilter })); // add superhost and dates
      //   dispatch(fetchCars({ bounds }));

      console.log("map bounds", bounds, minPricing, maxPricing, "prices");
    }
  }, [minPricing, maxPricing, bounds, superhostFilter, dispatch]);

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
        <img src="./no_car_found.png" alt="no cars found"></img>
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
          setMinPricing={setMinPricing}
          setMaxPricing={setMaxPricing}
          setSuperhostFilter={setSuperhostFilter}
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
        <p>These cars can be picked up in this city.</p>
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
        {/* {cars.map((car, idx) => (
          <CarSearchIndexItem key={idx} className="car-tile" car={car} />
        ))} */}
        <CarList
          cars={cars}
          highlightedCar={highlightedCar}
          setHighlightedCar={setHighlightedCar}
        />
      </div>
    </div>
  );
}

export default CarsSearchIndex;
