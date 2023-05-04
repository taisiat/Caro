import "./CarBookForm.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTrip } from "../../store/trips";
import { __esModule } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CarBookForm = ({ car }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const fromDate = localStorage.getItem("fromDate");
  const untilDate = localStorage.getItem("untilDate");
  const { carId } = useParams();
  const protectionPrices = {
    Premier: 50,
    Standard: 30,
    Minimum: 10,
    None: 0,
  };
  const [errors, setErrors] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (fromDate) {
      setStartDate(fromDate);
      localStorage.removeItem("fromDate");
    }
  }, [fromDate]);

  useEffect(() => {
    if (untilDate) {
      setEndDate(untilDate);
      localStorage.removeItem("untilDate");
    }
  }, [untilDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tripPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
    const protectionPrice = protectionPrices[selectedAnswer] * days;
    return days * car.dailyRate + protectionPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!sessionUser) {
      setErrors(["Please log in or sign up to book a trip."]);
      return;
    }

    if (new Date(startDate) <= new Date()) {
      setErrors(["Start date must be in the future."]);
      return;
    }
    const tripData = {
      carId,
      startDate: handleDateChange(startDate),
      endDate: handleDateChange(endDate),
      protectionPlan: selectedAnswer,
    };

    try {
      await dispatch(createTrip(tripData));
      history.push("/trips");
    } catch (error) {
      let data;
      try {
        data = await error.clone().json();
      } catch {
        data = await error.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([error.statusText]);
    }
  };

  const handleAnswerClick = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleDateChange = (userInputDate) => {
    const dateObj = new Date(Date.parse(userInputDate));
    const utcDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    );
    return utcDate;
  };

  const handleDateInput = (e) => {
    setStartDate(e.target.value);
    if (endDate === "") {
      const nextDay = new Date(e.target.value);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay.toISOString().slice(0, 10));
    }
  };

  return (
    <>
      <div id="car-show-price-container">
        <h3>{`$${car.dailyRate} / day`}</h3>
        {startDate && endDate && selectedAnswer ? (
          <p>{`$${tripPrice()}  total`}</p>
        ) : (
          <p>Add trip dates and protection plan to see final price</p>
        )}
      </div>
      <div id="search-car-show-container"></div>
      <form onSubmit={handleSubmit}>
        <p className="form-field-title">Trip start</p>
        <div id="from-input-container-car-show">
          <input
            type="date"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="search-input-car-show search-date"
            value={startDate}
            onChange={handleDateInput}
          ></input>
        </div>
        {errors.map((error) => {
          if (error.includes("Start"))
            return (
              <p className="booking-error-msg" key={error}>
                {error}
              </p>
            );
        })}
        <p className="form-field-title">Trip end</p>
        <div id="until-input-container-car-show">
          <input
            type="date"
            value={endDate}
            min={startDate}
            className={`search-input-car-show search-date${
              endDate < startDate ? " date-input-error" : ""
            }`}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>
        {errors.map((error) => {
          if (error.includes("End"))
            return (
              <p className="booking-error-msg" key={error}>
                {error}
              </p>
            );
        })}
        <h2 className="form-field-title">Please select a protection plan</h2>
        <div id="protection-plan-options-container">
          <label
            className={`booking-protection-button ${
              selectedAnswer === "Premier" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="booking-protection"
              value="Premier"
              onChange={handleAnswerClick}
            />
            Premier: Chill out and drive happy with the maximum coverage plan.
            Price: $50 / day
          </label>
          <label
            className={`booking-protection-button ${
              selectedAnswer === "Standard" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="booking-protection"
              value="Standard"
              onChange={handleAnswerClick}
            />
            Standard: Hit the road confidently with solid protection. Price: $30
            / day
          </label>
          <label
            className={`booking-protection-button ${
              selectedAnswer === "Minimum" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="booking-protection"
              value="Minimum"
              onChange={handleAnswerClick}
            />
            Minimum: Stay covered while pinching some pennies. Price: $10 / day
          </label>
          <label
            className={`booking-protection-button ${
              selectedAnswer === "None" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="booking-protection"
              value="None"
              onChange={handleAnswerClick}
            />
            None: Decline Caro's coverage. Price: $0 / day
          </label>
        </div>
        {errors.map((error) => {
          if (error.includes("Protection"))
            return (
              <p className="booking-error-msg" key={error}>
                Please select a protection option from the above
              </p>
            );
        })}

        {sessionUser ? (
          <div>
            <button id="book-car-button">Book this car</button>
          </div>
        ) : (
          <div>
            <div id="cant-book-car-button">Book this car</div>
            <p id="cant-book-car-mssg">Log in or sign up to book this car</p>
          </div>
        )}
        {errors.map((error) => {
          if (error.includes("Please log in or sign up"))
            return (
              <p className="booking-error-msg" key={error}>
                {error}
              </p>
            );
        })}
      </form>

      {errors.map((error) => {
        if (error.includes("Trip dates overlap"))
          return (
            <p className="booking-error-msg" key={error}>
              {error}
            </p>
          );
      })}
    </>
  );
};

export default CarBookForm;
