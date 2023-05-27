import "./TripShowPage.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteTrip } from "../../store/trips";
import { updateTrip } from "../../store/trips";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTrip } from "../../store/trips";
import { fetchTrips } from "../../store/trips";
import SearchLine from "../SearchLine";
import Spinner from "../Spinner";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const TripShowPage = () => {
  const { tripId } = useParams();
  const trip = useSelector((state) => state.trips[tripId]);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const protectionPrices = {
    Premier: 50,
    Standard: 30,
    Minimum: 10,
    None: 0,
  };
  const [dateRange, setDateRange] = useState(null);
  const [flatpickrKey, setFlatpickrKey] = useState(Date.now());

  const formattedDate = (rawDate) => {
    const date = new Date(rawDate);
    return new Date(date.getTime()).toISOString().substr(0, 10);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (trip) {
      // setStartDate(formattedDate(trip.startDate));
      // setEndDate(formattedDate(trip.endDate));
      setDateRange([
        formattedDate(trip.startDate),
        formattedDate(trip.endDate),
      ]);
      setSelectedAnswer(trip.protectionPlan);
      setFlatpickrKey(Date.now());
    }
  }, [trip]);

  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, [dispatch, tripId]);

  if (!sessionUser) {
    history.push("/");
    return;
  }

  const isLoading = !trip || !sessionUser;

  if (isLoading) {
    return <Spinner />;
  }

  if (sessionUser && trip.driverId !== sessionUser.id) {
    history.push("/");
  }

  const tripPrice = () => {
    const start = new Date(dateRange[0]);
    const end = new Date(dateRange[1]);
    const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
    const protectionPrice = protectionPrices[selectedAnswer] * days;
    return days * trip.car.dailyRate + protectionPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (new Date(dateRange[0]) <= new Date()) {
      setErrors(["Start date must be in the future."]);
      return;
    }

    const tripData = {
      tripId: trip.id,
      carId: trip.car.id,
      startDate: new Date(dateRange[0].toLocaleString()).toISOString(),
      endDate: new Date(dateRange[1].toLocaleString()).toISOString(),
      protectionPlan: selectedAnswer,
    };

    try {
      await dispatch(updateTrip(tripData));
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

  const handleTripDelete = () => {
    dispatch(
      deleteTrip(trip.id, () => {
        dispatch(fetchTrips());
        history.push("/trips");
      })
    );
  };

  const handleDateInput = (selectedDates) => {
    // console.log("selectedDates:", selectedDates, dateRange, "dateRange");
    if (selectedDates.length < 2) {
      return;
    } else if (selectedDates.length === 2) {
      setDateRange(selectedDates);
    }
    // setFrom(selectedDates[0]);
    // setUntil(selectedDates[1]);
  };

  return (
    <>
      <SearchLine />
      <div id="trip-edit-form-container">
        <div className="car-show-price-container">
          <h3 id="daily-rate-pricing-trip-edit">{`$${trip.car.dailyRate} / day`}</h3>
          {dateRange?.length === 2 && selectedAnswer ? (
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
                  // onClose: handleOnClose,
                  altInput: true,
                  altFormat: "F j, Y",
                  mode: "range",
                  // onReady: function (selectedDates, dateStr, instance) {
                  // instance.setDate([from, until]);
                  // },
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
          {/* <p className="form-field-title">Trip start</p>
          <div id="from-input-container-car-show">
            <input
              type="date"
              className="search-input-car-show search-date"
              value={startDate}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          {errors &&
            errors.map((error) => {
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
              onChange={(e) => setEndDate(e.target.value)}
              className={`search-input-car-show search-date${
                endDate < startDate ? " date-input-error" : ""
              }`}
            ></input>
          </div>
          {errors &&
            errors.map((error) => {
              if (error.includes("End"))
                return (
                  <p className="booking-error-msg" key={error}>
                    {error}
                  </p>
                );
            })} */}

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
              Standard: Hit the road confidently with solid protection. Price:
              $30 / day
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
              Minimum: Stay covered while pinching some pennies. Price: $10 /
              day
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
          {errors &&
            errors.map((error) => {
              if (error.includes("Protection"))
                return (
                  <p className="booking-error-msg" key={error}>
                    Please select a protection option from the above
                  </p>
                );
            })}
          <div>
            <button id="book-car-button">Update this booking</button>
          </div>
        </form>
        <div>
          <button id="delete-trip-button" onClick={handleTripDelete}>
            Cancel trip
          </button>
        </div>
      </div>
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

export default TripShowPage;
