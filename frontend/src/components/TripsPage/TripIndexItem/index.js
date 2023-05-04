import "./TripIndexItem.css";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { deleteTrip } from "../../../store/trips";
// import { fetchTrips } from "../../../store/trips";
// import { useEffect } from "react";
// import { fetchReviews } from "../../../store/reviews";
// import { useSelector } from "react-redux";
// import Spinner from "../../Spinner";

const TripIndexItem = ({ trip, reviews }) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const reviews = useSelector((state) => Object.values(state.reviews));

  //   const dateFormat = (dateStr) => {
  //     const date = new Date(dateStr);
  //     const options = { month: "long", day: "numeric" };
  //     return date.toLocaleString("en-US", options);
  //     // const date = new Date(dateStr);
  //     // const day = date.getDate(dateStr);
  //     // const month = date.toLocaleString("default", { month: "long" });
  //     // return `${month} ${day}`;
  // };
  const dateFormat = (utcDateString) => {
    // const utcDate = new Date(dateStr);
    // const localDate = new Date(
    //   utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
    // );
    const options = { month: "long", day: "numeric" };
    // return localDate.toLocaleString("en-US", options);
    const utcDate = new Date(utcDateString);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    const localDateString = localDate.toLocaleString("en-US", options);
    return localDateString;
  };

  //   const dateFormat = (dateStr) => {
  //     const date = new Date(dateStr);
  //     const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  //     utcDate.setUTCHours(0, 0, 0, 0);
  //     const options = { month: "long", day: "numeric" };
  //     return utcDate.toLocaleDateString("en-US", options);
  //   };

  // useEffect(() => {
  //   dispatch(fetchTrips());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchReviews());
  // }, [dispatch]);

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
  //   const reviewExists = () => {
  //     if (reviews) {
  //       reviews.forEach((review) => {
  //         if (
  //           review.driverId === trip.driver.id &&
  //           review.carId === trip.car.id
  //         ) {
  //           reviewId = review.id;
  //           return true;
  //         }
  //       });
  //       return false;
  //     }
  //   };

  // useEffect(() => {
  //   if (reviews) {
  //     reviews.forEach((review) => {
  //       if (review.driverId === trip.driver.id && review.carId === trip.car.id) {
  //         reviewId = review.id;
  //         return reviewId;
  //       }
  //     });
  //   }
  // },[reviews]);

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
        {trip.startDate >= new Date().toISOString() ? (
          <button
            className="trips-options-buttons"
            onClick={() => history.push(`/trips/${trip.id}`)}
          >
            Update or delete trip
          </button>
        ) : null}

        {/* {trip.endDate < new Date().toISOString() &&
        trip.driver.id !== trip.car.host.id ? (
          <button
            className="trips-options-buttons"
            onClick={() => history.push(`/cars/${trip.car.id}/reviews`)}
          >
            Review car
          </button>
        ) : null} */}
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
        {/* <button
          className="trips-options-buttons"
          onClick={() => history.push(`/cars/${trip.car.id}/reviews`)}
        >
          Review car
        </button> */}
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
