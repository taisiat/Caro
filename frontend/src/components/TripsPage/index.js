import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TripsPage.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchTrips } from "../../store/trips";
import SearchLine from "../SearchLine";
import noTripsImage from "./image_no_trips.png";
import TripIndexItem from "./TripIndexItem";

function TripsPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const trips = useSelector((state) => Object.values(state.trips));

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch, sessionUser]);

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };
  if (!sessionUser) return <Redirect to="/" />;

  if (!trips || !trips.length) {
    return (
      <>
        <SearchLine />
        <img src={noTripsImage} alt="no cars found"></img>
      </>
    );
  }

  return (
    <>
      <SearchLine />
      {trips.map((trip) => (
        <TripIndexItem trip={trip} key={trip.id} />
      ))}
    </>
  );
}

export default TripsPage;
