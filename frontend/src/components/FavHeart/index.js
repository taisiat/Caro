import { FaHeart, FaLessThanEqual } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchFavorites,
  deleteFavorite,
  createFavorite,
} from "../../store/favorites";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUser } from "../../store/user";

const FavHeart = ({ car }) => {
  const [heartClick, setHeartClick] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => Object.values(state.favorites));
  // const [loading, setLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  // useEffect(() => {
  //   dispatch(fetchUser(sessionUser.id));
  // }, [dispatch, sessionUser]);

  let fav;
  if (favorites) {
    favorites.forEach((favorite) => {
      if (favorite.carId === car.id) {
        // setHeartClick(true);
        fav = favorite;
      }
    });
  }

  // useEffect(() => {
  //   if (favorites) {
  //     favorites.forEach((favorite) => {
  //       if (favorite.carId === car.id) {
  //         fav = favorite;
  //         // setHeartClick(true);
  //       }
  //     });
  //   }
  // }, [dispatch, car.id]);

  // if (fav) {
  //   setHeartClick(true);
  // }

  // if (!sessionUser) return null;

  useEffect(() => {
    if (fav) {
      setHeartClick(true);
    }
  }, [fav, car.id]);

  if (!sessionUser)
    return (
      // <>
      //   <FaHeart id="car-heart" className="car-heart-unauth" />
      // </>
      <div>
        <FaHeart
          id="car-heart"
          className="car-heart-unauth"
          // className={
          //   heartClick ? "heart-clicked car-heart-unauth" : "car-heart-unauth"
          // }
          // onClick={handleHeartClick}
        />
      </div>
    );

  // const handleHeartClick = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   setHeartClick(!heartClick);
  //   try {
  //     if (heartClick) {
  //       await dispatch(createFavorite({ carId: car.id }));
  //     } else if (fav) {
  //       await dispatch(deleteFavorite(fav.id));
  //       // setHeartClick(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };

  const handleHeartClick = async () => {
    // if (loading) return;
    // setLoading(true);
    // if (heartClick) {
    //   setHeartClick(false);
    // } else {
    //   setHeartClick(true);
    // }

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
    // setLoading(false);
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
