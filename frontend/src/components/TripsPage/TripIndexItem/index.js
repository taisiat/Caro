import "./TripIndexItem.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTrip } from "../../../store/trips";

const TripIndexItem = ({ trip }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  //   const handleDelete = (tripId) => {
  //     dispatch(deleteTrip(tripId));
  //   };

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
      </div>
      <div id="trip-buttons-container">
        <button className="trips-options-buttons">View details</button>
        <button className="trips-options-buttons">Cancel trip</button>
      </div>
    </div>
  );
};

export default TripIndexItem;
