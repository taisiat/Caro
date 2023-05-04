import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TripsPage.css";
import { Redirect } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { fetchTrips } from "../../store/trips";
import SearchLine from "../SearchLine";
import noTripsImage from "./image_no_trips.png";
import TripIndexItem from "./TripIndexItem";
// import Footer from "../Footer";
// import { deleteTrip } from "../../store/trips";
// import { useHistory } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";

function TripsPage() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  // const trips = useSelector((state) => Object.values(state.trips));
  const trips = useSelector((state) =>
    Object.values(state.trips).sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )
  );

  // const [tripsList, setTripsList] = useState([]);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch, sessionUser]);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // const handleTripDelete = (tripId) => {
  //   dispatch(deleteTrip(tripId));
  //   setTripsList(tripsList.filter((trip) => trip.id !== tripId));
  // };

  // const monthYear = (dateString) => {
  //   const dateObj = new Date(dateString);
  //   const options = { year: "numeric", month: "long" };
  //   return dateObj.toLocaleDateString("en-US", options);
  // };
  if (!sessionUser) return <Redirect to="/" />;

  const pageContent = () => {
    if (!trips || !trips.length) {
      return (
        <div id="no-trips-container">
          <img src={noTripsImage} alt="no cars found" id="no-cars-image"></img>
          <h2 id="no-trips-yet-lead">No booked trips</h2>
          <p id="no-trips-sub">
            This is where you can access information about your trips
          </p>
        </div>
      );
    } else {
      return (
        <>
          <h1 id="trips-header">Trips</h1>

          {trips.map((trip, idx) => (
            // <>
            <TripIndexItem
              trip={trip}
              key={`${idx}-${trip.id}`}
              reviews={reviews}
            ></TripIndexItem>
            // </>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <SearchLine />
      <div id="trips-page-container">{pageContent()}</div>
      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
}

export default TripsPage;
