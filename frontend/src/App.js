import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import ProfilePage from "./components/ProfilePage";
import TripsPage from "./components/TripsPage";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={`/users/:userId`}>
          <ProfilePage />
        </Route>
        <Route path={`/:userId/trips`}>
          <TripsPage />
        </Route>
        <Route path={`/:userId/favorites`}>
          <FavoritesPage />
        </Route>
        <Route path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
