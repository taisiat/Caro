import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import ProfilePage from "./components/ProfilePage";
import TripsPage from "./components/TripsPage";
import FavoritesPage from "./components/FavoritesPage";
import CarsSearchIndex from "./components/CarsSearchIndex";
import CarShowPage from "./components/CarShowPage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={`/users/:userId`}>
          <ProfilePage />
        </Route>
        <Route path={`/cars/:carId`}>
          <CarShowPage />
        </Route>
        <Route path={`/trips`}>
          <TripsPage />
        </Route>
        <Route path={`/:userId/favorites`}>
          <FavoritesPage />
        </Route>
        <Route path={`/cars`}>
          <CarsSearchIndex />
        </Route>
        <Route path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
