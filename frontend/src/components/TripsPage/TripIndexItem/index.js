import "./TripIndexItem.css";
import { useHistory } from "react-router-dom";

const TripIndexItem = ({ trip, reviews }) => {
  const history = useHistory();
  const currentSearchParams = new URLSearchParams(window.location.search);

  const dateFormat = (utcDateString) => {
    const options = { month: "long", day: "numeric" };
    const utcDate = new Date(utcDateString);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    const localDateString = localDate.toLocaleString("en-US", options);
    return localDateString;
  };

  let reviewId;

  const reviewExists = () => {
    if (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        if (
          review.driverId === trip.driver.id &&
          review.carId === trip.car.id
        ) {
          reviewId = review.id;
          return true;
        }
      }
      return false;
    }
  };

  const handleTileClick = () => {
    currentSearchParams.delete("viewport");
    currentSearchParams.set("zoom", 17);
    history.push({
      pathname: `/cars/${trip.car.id}`,
      search: currentSearchParams.toString(),
    });
  };

  return (
    <div id="trips-item-container">
      <div id="trip-car-image-container" onClick={handleTileClick}>
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
        {trip.startDate >= new Date().toISOString() ? (
          <button
            className="trips-options-buttons"
            onClick={() => history.push(`/trips/${trip.id}`)}
          >
            Update or delete trip
          </button>
        ) : null}
        {trip.endDate < new Date().toISOString() &&
        trip.driver.id !== trip.car.host.id &&
        !reviewExists() ? (
          <button
            className="trips-options-buttons"
            onClick={() => history.push(`/cars/${trip.car.id}/reviews`)}
          >
            Review car
          </button>
        ) : null}
        {trip.endDate < new Date().toISOString() &&
        trip.driver.id !== trip.car.host.id &&
        reviewExists() ? (
          <button
            className="trips-options-buttons"
            onClick={() => history.push(`/reviews/${reviewId}`)}
          >
            Update or delete review
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TripIndexItem;
