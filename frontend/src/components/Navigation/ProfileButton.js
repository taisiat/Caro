import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import { RxExit } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiUserLine } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { GiRoad } from "react-icons/gi";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  return (
    <>
      <button id="profile-button" onClick={openMenu}>
        <GiHamburgerMenu />
        <RiUserLine />
        {/* <i className="fa-solid fa-bars"></i>
        <i className="fa-regular fa-circle-user"></i> */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <li id="favorites-drop">
            <RiHeart3Line />
            Favorites
          </li>
          <li id="trips-drop">
            <GiRoad />
            Trips
          </li>
          <li id="profile-drop">Profile</li>
          <li id="logout-drop" onClick={logout}>
            <RxExit />
            Log out
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
