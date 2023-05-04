import "./CarSearchIndexItem.css";
import { AiTwotoneStar } from "react-icons/ai";
import { IoRibbonSharp } from "react-icons/io5";
import { BiMapAlt } from "react-icons/bi";
import FavHeart from "../FavHeart";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Spinner";

const CarSearchIndexItem = ({
  car,
  isHighlighted,
  setHighlightedCar,
  favorites,
  searchPageUntilDate,
  searchPageFromDate,
}) => {
  const [heartClick, setHeartClick] = useState(false);

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

  const handleTileClick = () => {
    localStorage.setItem("cityZoom", 14);
    localStorage.setItem("fromDate", searchPageFromDate);
    localStorage.setItem("untilDate", searchPageUntilDate);
    history.push(`/cars/${car.id}`);
  };

  return (
    <div
      id="car-index-item-container"
      className={isHighlighted ? "highlighted" : ""}
      onMouseEnter={() => setHighlightedCar && setHighlightedCar(car.id)}
      onMouseLeave={() => setHighlightedCar && setHighlightedCar(null)}
    >
      <div id="car-image-container" onClick={handleTileClick}>
        {car.photosUrl && (
          <img
            src={car.photosUrl[0] ? car.photosUrl[0] : <Spinner />}
            alt="Car picture"
            className="car-index-item-tile"
          />
        )}
      </div>
      <div id="car-tile-info" onClick={handleTileClick}>
        <h2 id="car-name">{`${car.make} ${car.model} ${car.year}`}</h2>
        <div id="car-tile-trips-and-host-info">
          <p id="car-tile-rating-trips-container">
            {avgCarRating()} <AiTwotoneStar id="rating-star" />{" "}
            {`(${car.tripsCount} ${car.tripsCount === 1 ? "trip" : "trips"})`}
          </p>
          {car.host.isSuperhost && (
            <p>
              <IoRibbonSharp /> All-Star Host
            </p>
          )}
        </div>
        <div id="car-tile-location-info">
          <BiMapAlt />
          <p>{car.city}</p>
        </div>
      </div>
      <div id="car-heart-price-container">
        <FavHeart
          id="car-heart"
          className={heartClick ? "heart-clicked" : ""}
          onClick={(event) => {
            event.stopPropagation();
            handleHeartClick();
          }}
          car={car}
          favorites={favorites}
        />
        <div id="car-price-container" onClick={handleTileClick}>
          <h3>{`$${car.dailyRate}/day`}</h3>
          <p>{`$${car.dailyRate} est. total`}</p>
        </div>
      </div>
    </div>
  );
};
export default CarSearchIndexItem;
