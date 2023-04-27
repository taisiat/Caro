import "./CarBookForm.css";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTrip } from "../../store/trips";
import { __esModule } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

const CarBookForm = ({ car }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insurance, setInsurance] = useState("");
  const { carId } = useParams();
  const protectionPrices = {
    Premier: 150,
    Standard: 50,
    Minimum: 10,
  };

  const tripPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const protectionPrice = protectionPrices[insurance];
    return days * car.dailyRate + protectionPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionUser) {
      history.push("/login");
      return;
    }
    const tripData = {
      carId,
      //   driverId: sessionUser.id,
      startDate,
      endDate,
      protectionPlan: insurance,
      totalPrice: tripPrice(),
    };
    console.log(tripData, "TRIP DATA");
    dispatch(createTrip(tripData));
    // history.push("/trips");
  };

  return (
    <>
      <div id="car-show-price-container">
        <h3>{`$${car.dailyRate} / day`}</h3>
        {startDate && endDate && insurance ? (
          <p>{`$${tripPrice()}  total`}</p>
        ) : (
          <p>Add trip dates and protection plan to see final price</p>
        )}
      </div>
      <div id="search-car-show-container">
        <div id="where-container-car-show">
          <p>Pickup & return location</p>
          <h3>{car.location}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="form-field-title">Trip start</p>
        <div id="from-input-container-car-show">
          <input
            type="date"
            className="search-input-car-show search-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <p className="form-field-title">Trip end</p>
        <div id="until-input-container-car-show">
          <input
            type="date"
            className="search-input-car-show search-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>
        <p className="form-field-title">Please select a protection plan</p>
        <div id="trip-insurance-input-container-car-show">
          <select
            className="search-input-car-show"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          >
            <option disabled value="">
              Plans:
            </option>
            <option value="Premier">
              Premier: Chill out and drive happy with the maximum coverage plan.
            </option>
            <option value="Standard">
              Standard: Hit the road confidently with solid protection.
            </option>
            <option value="Minimum">
              Minimum: Stay covered while pinching some pennies.
            </option>
          </select>
        </div>
        <div>
          <button id="book-car-button">Book this car</button>
        </div>
      </form>
    </>
  );
};

export default CarBookForm;
