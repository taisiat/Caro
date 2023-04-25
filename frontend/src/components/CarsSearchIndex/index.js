import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarsSearchIndex.css";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import { fetchCars } from "../../store/cars";
import SearchLine from "../SearchLine";
import { IoOptionsOutline } from "react-icons/io5";

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
    return null;
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
        <h2>200+ cars available</h2>
        <p>These cars can be picked up in this city.</p>
      </div>
      <div id="map-container"></div>

      {/* <div id="car-results-container">
        {cars.map((car, idx) => (
          <li key={idx}>
            {`${car.id} ${car.make} ${car.model} Listed in: ${monthYear(
              car.createdAt
            )} Owned by ${car.host.firstName} ${car.host.lastName}`}
            <ul>
              {car.photosUrl &&
                car.photosUrl.map((photoUrl, picIdx) => (
                  <li key={picIdx}>
                    <img
                      src={photoUrl}
                      alt="Car picture"
                      className="car-image"
                    />
                  </li>
                ))}
            </ul>
            <li>
              {" Lucky owner of this car:"}
              {car.host.photoUrl && (
                <img
                  src={car.host.photoUrl}
                  alt="User profile picture"
                  className="user-show-image"
                />
              )}
            </li>
            <br />
          </li>
        ))}
      </div> */}
    </div>
  );
}

export default CarsSearchIndex;
