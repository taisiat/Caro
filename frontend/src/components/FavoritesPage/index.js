import "./FavoritesPage.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchLine from "../SearchLine";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/favorites";
import FavoriteIndexItem from "./FavoriteIndexItem";
import { fetchCars } from "../../store/cars";
import noFavImg from "./no_favs_yet.png";

function FavoritesPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => Object.values(state.favorites));
  const cars = useSelector((state) => Object.values(state.cars));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchCars({}));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <SearchLine />
      <div id="favs-container">
        {favorites.length !== 0 && (
          <h2 id="favorites-header">{`${sessionUser.firstName}'s favorites`}</h2>
        )}
        <div id="favs-index-container">
          {favorites &&
            favorites.map((favorite, idx) => (
              <FavoriteIndexItem key={idx} favorite={favorite} />
            ))}
        </div>
        {favorites.length === 0 && (
          <>
            <img id="no-fav-img" src={noFavImg} alt="no favs" />
            <h2 id="no-favs-yet-lead">No favorites yet</h2>
            <p>You’ll be able to access your favorited cars here.</p>
          </>
        )}
      </div>
    </>
  );
}

export default FavoritesPage;
