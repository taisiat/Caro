import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
// import SignupForm from "../SignupFormPage/SignupForm";
import SignupFormModal from "../SignupFormPage";
import logo from "./logo.png";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav>
      <div id="nav-left">
        <a href="/">
          <img src={logo} alt="logo" id="logo" />
        </a>
      </div>
      <div id="nav-right">{sessionLinks}</div>
    </nav>

    // <ul>
    //   <li>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //     {sessionLinks}
    //   </li>
    // </ul>
  );
}

export default Navigation;
