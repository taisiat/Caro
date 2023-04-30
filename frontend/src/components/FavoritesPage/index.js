import "./FavoritesPage.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchLine from "../SearchLine";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/favorites";
import Spinner from "../Spinner";
import FavoriteIndexItem from "./FavoriteIndexItem";

function FavoritesPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => Object.values(state.favorites));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Redirect to="/" />;

  // if (!favorites) {
  //   return <Spinner />;
  // }

  return (
    <>
      <SearchLine />
      <div id="favs-container">
        <h2 id="favorites-header">{`${sessionUser.firstName}'s favorites`}</h2>
        <div id="favs-index-container">
          {favorites &&
            favorites.map((favorite, idx) => (
              <FavoriteIndexItem carId={favorite.carId} key={idx} />
            ))}
        </div>
      </div>
    </>
  );
}

export default FavoritesPage;
