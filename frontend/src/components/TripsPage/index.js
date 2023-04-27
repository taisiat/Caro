import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TripsPage.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchTrips } from "../../store/trips";
import SearchLine from "../SearchLine";
import noTripsImage from "./image_no_trips.png";
import TripIndexItem from "./TripIndexItem";
import Footer from "../Footer";
import { deleteTrip } from "../../store/trips";
import { useHistory } from "react-router-dom";

function TripsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const trips = useSelector((state) => Object.values(state.trips));

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch, sessionUser]);

  const handleDelete = (tripId) => {
    dispatch(deleteTrip(tripId));
  };

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };
  if (!sessionUser) return <Redirect to="/" />;

  const pageContent = () => {
    if (!trips || !trips.length) {
      return (
        <div id="no-trips-container">
          <img src={noTripsImage} alt="no cars found" id="no-cars-image"></img>
          <h2 id="no-trips-header">No booked trips</h2>
          <p id="no-trips-sub">
            This is where you can access information about your trips
          </p>
        </div>
      );
    } else {
      return (
        <>
          <h1 id="trips-header">Trips</h1>

          {trips.map((trip) => (
            <TripIndexItem
              trip={trip}
              key={trip.id}
              onClick={() => handleDelete(trip.id)}
            />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <SearchLine />
      <div id="trips-page-container">{pageContent()}</div>
      <Footer />
    </>
  );
}

export default TripsPage;
