import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarsSearchIndex.css";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import { fetchCars } from "../../store/cars";
import SearchLine from "../SearchLine";
import { IoOptionsOutline } from "react-icons/io5";
import CarSearchIndexItem from "../CarSearchIndexItem";

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

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
        <button>
          <p>Sort by</p>
        </button>
        <button>
          <p>Price</p>
        </button>
        <button>
          <p>
            <IoOptionsOutline /> More filters
          </p>
        </button>
      </div>
      <div id="car-search-summary">
        <h2>{`${cars ? cars.length : 0} cars available`}</h2>
        <p>These cars can be picked up in this city.</p>
      </div>
      <div id="map-container"></div>
      <div id="car-tile-container">
        {cars.map((car, idx) => (
          <CarSearchIndexItem key={idx} className="car-tile" car={car} />
        ))}
      </div>
    </div>
  );
}

export default CarsSearchIndex;
