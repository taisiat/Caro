import "./ProfilePage.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  //   const { userId } = useParams();
  //   const user = useSelector((state) => state.users[userId]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      Hi from user profile page!
      <li>{`${sessionUser.firstName} ${sessionUser.lastName}`}</li>
      <li>{sessionUser.email}</li>
      <li>{sessionUser.phoneNumber}</li>
    </>
  );
}

export default ProfilePage;
