import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  //   const { id } = useParams();
  const user = useSelector((state) => state.users[26]);
  //   const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  //   if (!sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    dispatch(fetchUser(26));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <>
      Hi from user profile page!
      <p>session user:</p>
      <li>{`${sessionUser.firstName} ${sessionUser.lastName}`}</li>
      <li>{sessionUser.email}</li>
      <li>{sessionUser.phoneNumber}</li>
      <p>User:</p>
      <li>{`${user.firstName} ${user.lastName}`}</li>
      <li>{user.email}</li>
      <li>{user.phoneNumber}</li>
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
