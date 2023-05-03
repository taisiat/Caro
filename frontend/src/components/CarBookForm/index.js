import "./CarBookForm.css";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTrip } from "../../store/trips";
import { __esModule } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginFormModal/LoginForm";
import { useEffect } from "react";

const CarBookForm = ({ car }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const fromDate = localStorage.getItem("fromDate");
  const untilDate = localStorage.getItem("untilDate");
  //   const [insurance, setInsurance] = useState("");
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
      // console.log("fromDate", fromDate, startDate, "startdate");
      localStorage.removeItem("fromDate");
      //   localStorage.clear();
    }
  }, [fromDate]);

  useEffect(() => {
    if (untilDate) {
      setEndDate(untilDate);
      // console.log("untilDate", untilDate);
      localStorage.removeItem("untilDate");
      //   localStorage.clear();
    }
  }, [untilDate]);

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
    // if (!sessionUser) {
    //   history.push("/login");
    //   return;
    // }
    if (!sessionUser) {
      setErrors(["Please log in or sign up to book a trip."]);
      return;
      //   return <LoginForm />;
    }

    if (new Date(startDate) <= new Date()) {
      setErrors(["Start date must be in the future."]);
      return;
    }
    const tripData = {
      carId,
      //   driverId: sessionUser.id,
      //   startDate: new Date(startDate.toLocaleString()).toISOString(),
      //   endDate: new Date(endDate.toLocaleString()).toISOString(),
      startDate: handleDateChange(startDate),
      endDate: handleDateChange(endDate),
      protectionPlan: selectedAnswer,
    };

    try {
      await dispatch(createTrip(tripData));
      history.push("/trips");
    } catch (error) {
      let data;
      // dispatch(createTrip(tripData)).catch(async (res) => {
      //   let data;
      try {
        data = await error.clone().json();
        // if (data.ok) history.push("/trips");
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
    // const localDate = new Date(dateVal).toLocaleDateString();
    // return new Date(dateVal).toLocaleDateString();
    // if (type === "start") setStartDate(localDate);
    // else setEndDate(localDate);
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
      <div id="search-car-show-container">
        {/* <div id="where-container-car-show">
          <p>Pickup & return location</p>
          <h3>{car.location}</h3>
        </div> */}
      </div>
      <form onSubmit={handleSubmit}>
        <p className="form-field-title">Trip start</p>
        <div id="from-input-container-car-show">
          <input
            type="date"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="search-input-car-show search-date"
            value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
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
            // className="search-input-car-show search-date"
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
        {/* <p className="form-field-title">Please select a protection plan</p>
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
              Price: $150
            </option>
            <option value="Standard">
              Standard: Hit the road confidently with solid protection. Price:
              $80
            </option>
            <option value="Minimum">
              Minimum: Stay covered while pinching some pennies. Price: $30
            </option>
          </select>
        </div> */}

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

        {/* <div>
          <button id="book-car-button">Book this car</button>
        </div> */}
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
