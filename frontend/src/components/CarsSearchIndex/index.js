import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarsSearchIndex.css";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import { fetchCars } from "../../store/cars";

function CarsSearchIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const cars = useSelector((state) => Object.values(state.cars));

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (!cars) {
    return null;
  }

  return (
    <>
      Hi from car index page!
      {cars.map((car, idx) => (
        <li key={idx}>
          {`${car.id} ${car.make} ${car.model}`}
          <ul>
            {car.photosUrl &&
              car.photosUrl.map((photoUrl, picIdx) => (
                <li key={picIdx}>
                  <img src={photoUrl} alt="Car picture" className="car-image" />
                </li>
              ))}
          </ul>
          <br />
        </li>
      ))}
    </>
  );
}

export default CarsSearchIndex;
