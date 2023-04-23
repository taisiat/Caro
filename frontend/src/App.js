import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        {/* <Route path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
