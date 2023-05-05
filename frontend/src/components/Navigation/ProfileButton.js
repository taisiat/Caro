import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import { RxExit } from "react-icons/rx";
import { RiHeart3Line } from "react-icons/ri";
import { GiRoad } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";
import { useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import demoProfilePic from "./demo_profile_pic.jpg";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    dispatch(fetchUser(sessionUser.id));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    dispatch(fetchUser(sessionUser.id));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profileImg = () => {
    if (sessionUser.id === 1) {
      return (
        <img
          src={demoProfilePic}
          alt="profile picture"
          id="profile-img-button"
        />
      );
    } else if (sessionUser.photoUrl) {
      return (
        <img
          src={sessionUser.photoUrl}
          alt="profile picture"
          id="profile-img-button"
        />
      );
    } else {
      return <VscAccount />;
    }
  };

  return (
    <div id="profile-button-container">
      <button id="profile-button" className="nav-button" onClick={openMenu}>
        <SlMenu />
        {profileImg()}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li id="favorites-drop" className="hamburger-options">
            <a href="/favorites">
              <RiHeart3Line className="hamburger-icon" />
              Favorites
            </a>
          </li>
          <li id="trips-drop" className="hamburger-options">
            <a href="/trips">
              <GiRoad className="hamburger-icon" />
              Trips
            </a>
          </li>
          <li className="division-line"></li>
          <li id="profile-drop" className="hamburger-options">
            <a href={`/users/${sessionUser.id}`}>
              <VscAccount className="hamburger-icon" />
              Profile
            </a>
          </li>
          <li id="logout-drop" className="hamburger-options" onClick={logout}>
            <RxExit className="hamburger-icon" />
            Log out
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
