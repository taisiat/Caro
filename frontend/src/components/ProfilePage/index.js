import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  //   const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  //   if (!sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <>
      Hi from user profile page!
      <p>Whose profile page is this based on url?:</p>
      <li>{`${user.firstName} ${user.lastName}`}</li>
      <li>{user.email}</li>
      <li>{user.phoneNumber}</li>
      <li>{`Joined Caro: ${monthYear(user.createdAt)}`}</li>
      <li>{user.isSuperhost ? "superhost" : ""}</li>
      <li>
        {" "}
        {user.photoUrl && (
          <img
            src={user.photoUrl}
            alt="User profile picture"
            className="user-show-image"
          />
        )}
      </li>
    </>
  );
}

export default ProfilePage;
