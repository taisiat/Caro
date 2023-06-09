import "./CarBookForm.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createTrip } from "../../store/trips";
import { __esModule } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const CarBookForm = ({ car }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { carId } = useParams();
  const protectionPrices = {
    Premier: 50,
    Standard: 30,
    Minimum: 10,
    None: 0,
  };
  const [errors, setErrors] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const urlParams = new URLSearchParams(location.search);

  const datesParam = urlParams.get("dates");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [dateRange, setDateRange] = useState([tomorrow, dayAfter]);
  const [flatpickrKey, setFlatpickrKey] = useState(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (datesParam) {
      const datesArray = datesParam.split(",");
      const fromDate = new Date(datesArray[0].substring(0, 15));
      const untilDate = new Date(datesArray[1].substring(0, 15));
      setDateRange([fromDate, untilDate]);
      setFlatpickrKey(Date.now());
    }
  }, [datesParam]);

  const tripPrice = () => {
    const start = new Date(dateRange[0]);
    const end = new Date(dateRange[1]);
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

    if (new Date(dateRange[0]) <= new Date()) {
      setErrors(["Start date must be in the future."]);
      return;
    }
    const tripData = {
      carId,
      startDate: handleDateChange(dateRange[0]),
      endDate: handleDateChange(dateRange[1]),
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

  const handleDateInput = (selectedDates) => {
    if (selectedDates.length < 2) {
      return;
    } else if (selectedDates.length === 2) {
      setDateRange(selectedDates);
    }
  };

  return (
    <>
      <div id="car-show-price-container">
        <h3 className="daily-rate-pricing">{`$${car.dailyRate} / day`}</h3>
        {dateRange.length === 2 && selectedAnswer ? (
          <p>{`$${tripPrice()}  total`}</p>
        ) : (
          <p>Add trip dates and protection plan to see final price</p>
        )}
      </div>
      <div id="search-car-show-container"></div>
      <form onSubmit={handleSubmit}>
        <div id="when-container-create-trip">
          <p className="form-field-title">Trip dates</p>
          <div id="from-input-container-car-show">
            <Flatpickr
              key={flatpickrKey}
              className="search-date-create-trip-flatpickr"
              placeholder="Start and end dates for your trip"
              options={{
                dateFormat: "Y-m-d",
                minDate: new Date().fp_incr(1),
                defaultDate: dateRange,
                onChange: handleDateInput,
                altInput: true,
                altFormat: "F j, Y",
                mode: "range",
              }}
            />
          </div>
        </div>
        {errors.map((error) => {
          if (error.includes("date"))
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
