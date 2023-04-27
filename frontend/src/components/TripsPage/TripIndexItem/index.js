import "./TripIndexItem.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTrip } from "../../../store/trips";
import { fetchTrips } from "../../../store/trips";
import { useEffect } from "react";

const TripIndexItem = ({ trip }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dateFormat = (dateStr) => {
    // const date = new Date(dateStr);
    // const options = { month: "long", day: "numeric" };
    // return date.toLocaleString("en-US", options);
    const date = new Date(dateStr);
    const day = date.getDate(dateStr);
    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${day}`;
  };

  //   const dateFormat = (dateStr) => {
  //     const date = new Date(dateStr);
  //     const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  //     utcDate.setUTCHours(0, 0, 0, 0);
  //     const options = { month: "long", day: "numeric" };
  //     return utcDate.toLocaleDateString("en-US", options);
  //   };

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  return (
    <div id="trips-item-container">
      <div
        id="trip-car-image-container"
        onClick={() => history.push(`/cars/${trip.car.id}`)}
      >
        <img
          src={trip.car.photosUrl[0]}
          alt="car image"
          id="trip-car-img"
        ></img>
      </div>
      <div
        id="trip-stats-container"
        onClick={() => history.push(`/cars/${trip.car.id}`)}
      >
        <h1 id="trip-stats-label">YOUR TRIP</h1>
        <h2 id="trip-stats-car">{`${trip.car.make} ${trip.car.model} ${trip.car.year}`}</h2>
        <h3 id="trip-stats-dates">{`${dateFormat(
          trip.startDate
        )} - ${dateFormat(trip.endDate)}`}</h3>
        <h3 id="trip-stats-pp">{`Protection plan: ${trip.protectionPlan}`}</h3>
      </div>
      <div id="trip-buttons-container">
        <button
          className="trips-options-buttons"
          onClick={() => history.push(`/trips/${trip.id}`)}
        >
          Update or delete trip
        </button>
        {/* <button
        //   className="trips-options-buttons"
          //   onClick={() => dispatch(deleteTrip(trip.id))}
        //   onClick={() => handleTripDelete(trip.id)}
        >
          Cancel trip
        </button> */}
      </div>
    </div>
  );
};

export default TripIndexItem;
