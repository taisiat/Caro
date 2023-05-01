import "./FavoriteIndexItem.css";
import { AiTwotoneStar } from "react-icons/ai";
import { IoRibbonSharp } from "react-icons/io5";
import { BiMapAlt } from "react-icons/bi";
import FavHeart from "../../FavHeart";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCar } from "../../../store/cars";
import Spinner from "../../Spinner";

const FavoriteIndexItem = ({ carId }) => {
  const [heartClick, setHeartClick] = useState(false);
  const car = useSelector((state) => state.cars[carId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCar(carId));
  }, [dispatch, carId]);

  const handleHeartClick = () => {
    setHeartClick(!heartClick);
  };
  const history = useHistory();

  const avgCarRating = () => {
    const avg =
      (parseFloat(car.avgCleanlinessRating) +
        parseFloat(car.avgCommunicationRating) +
        parseFloat(car.avgMaintenanceRating) +
        parseFloat(car.avgConvenienceRating) +
        parseFloat(car.avgAccuracyRating)) /
      5.0;
    if (avg) {
      return avg.toFixed(2);
    } else {
      return "not yet rated";
    }
  };

  if (!car) {
    return <Spinner />;
  }

  return (
    <div
      id="fav-index-item-container"
      onClick={() => history.push(`/cars/${car.id}`)}
    >
      <div
        id="fav-image-container"
        // onClick={() => history.push(`/cars/${car.id}`)}
      >
        {car.photosUrl && (
          <img
            src={car.photosUrl[0]}
            alt="Car picture"
            className="fav-index-item-tile"
          />
        )}
      </div>
      <div id="fav-tile-info" onClick={() => history.push(`/cars/${car.id}`)}>
        <h2 id="fav-name">{`${car.make} ${car.model} ${car.year}`}</h2>
        <div id="fav-tile-trips-and-host-info">
          <p id="fav-tile-rating-trips-container">
            {avgCarRating()} <AiTwotoneStar id="rating-star" />{" "}
            {`(${car.tripsCount} ${car.tripsCount === 1 ? "trip" : "trips"})`}
          </p>
          {car.host.isSuperhost && (
            <p id="fav-superhost-tag">
              <IoRibbonSharp /> All-Star Host
            </p>
          )}
        </div>
      </div>
      <div id="fav-price-container">
        {/* <FavHeart
          id="car-heart"
          className={heartClick ? "heart-clicked" : ""}
          onClick={(event) => {
            event.stopPropagation();
            handleHeartClick();
          }}
          car={car}
        /> */}

        <div
          id="fav-price-container"
          onClick={() => history.push(`/cars/${car.id}`)}
        >
          <h3>{`$${car.dailyRate} / day`}</h3>
        </div>
      </div>
    </div>
  );
};
export default FavoriteIndexItem;
