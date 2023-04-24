import "./FavoritesPage.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function FavoritesPage() {
  //   const sessionUser = useSelector((state) => state.session.user);
  //   const { userId } = useParams();
  //   const user = useSelector((state) => state.users[userId]);

  //   if (!sessionUser) return <Redirect to="/" />;

  return <>Hi from user Favorites page!</>;
}

export default FavoritesPage;
