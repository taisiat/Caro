import { FaHeart } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFavorite, createFavorite } from "../../store/favorites";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FavHeart = ({ car, favorites }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [heartClick, setHeartClick] = useState(false);

  let fav;
  if (favorites) {
    favorites.forEach((favorite) => {
      if (favorite.carId === car.id) {
        fav = favorite;
      }
    });
  }

  useEffect(() => {
    if (fav) {
      setHeartClick(true);
    }
  }, [fav, car.id]);

  if (!sessionUser)
    return (
      <div>
        <FaHeart id="car-heart" className="car-heart-unauth" />
      </div>
    );

  const handleHeartClick = async () => {
    if (!heartClick) {
      try {
        dispatch(createFavorite({ carId: car.id }));
        setHeartClick(true);
      } catch (error) {
        console.error(error);
      }
    } else if (fav) {
      try {
        dispatch(deleteFavorite(fav.id));
        setHeartClick(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <FaHeart
        id="car-heart"
        className={heartClick ? "heart-clicked" : ""}
        onClick={handleHeartClick}
      />
    </div>
  );
};

export default FavHeart;
