import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormPage";
import logo from "./logo.png";
import { useState } from "react";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const changeLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  const changeSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const toggleForms = () => {
    setShowLoginModal(!showLoginModal);
    setShowSignupModal(!showSignupModal);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal
          showLoginModal={showLoginModal}
          changeLoginModal={changeLoginModal}
          setShowLoginModal={setShowLoginModal}
          showSignupModal={showSignupModal}
          changeSignupModal={changeSignupModal}
          setShowSignupModal={setShowSignupModal}
          toggleForms={toggleForms}
        />
        <SignupFormModal
          showLoginModal={showLoginModal}
          changeLoginModal={changeLoginModal}
          setShowLoginModal={setShowLoginModal}
          showSignupModal={showSignupModal}
          changeSignupModal={changeSignupModal}
          setShowSignupModal={setShowSignupModal}
          toggleForms={toggleForms}
        />
      </>
    );
  }

  return (
    <nav id="nav-bar">
      <div id="nav-left">
        <a href="/">
          <img src={logo} alt="logo" id="logo" />
        </a>
      </div>
      <div id="nav-right">{sessionLinks}</div>
    </nav>
  );
}

export default Navigation;
