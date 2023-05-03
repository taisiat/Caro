import "./CarSearchIndexItem.css";
import { AiTwotoneStar } from "react-icons/ai";
import { IoRibbonSharp } from "react-icons/io5";
import { BiMapAlt } from "react-icons/bi";
import FavHeart from "../FavHeart";
import { Redirect } from "react-router-dom";
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

  //   const address = (lat, lng) => {
  //     const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const address = data.results[0].address_components[6].long_name;
  //         console.log(address, "address");
  //       })
  //       .catch((error) => console.error(error));
  //   };

  const handleTileClick = () => {
    localStorage.setItem("cityZoom", 14);
    localStorage.setItem("fromDate", searchPageFromDate);
    localStorage.setItem("untilDate", searchPageUntilDate);
    history.push(`/cars/${car.id}`);
  };

  return (
    <div
      id="car-index-item-container"
      className={isHighlighted ? " highlighted" : ""}
      onMouseEnter={() => isHighlighted && setHighlightedCar(car.id)}
      onMouseLeave={() => isHighlighted && setHighlightedCar(null)}

      //   onClick={() => history.push(`/cars/${car.id}`)}
    >
      <div
        id="car-image-container"
        // onClick={() => history.push(`/cars/${car.id}`)}
        onClick={handleTileClick}
      >
        {car.photosUrl && (
          <img
            src={car.photosUrl[0] ? car.photosUrl[0] : <Spinner />}
            alt="Car picture"
            className="car-index-item-tile"
          />
        )}
      </div>
      <div
        id="car-tile-info"
        // onClick={() => history.push(`/cars/${car.id}`)}
        onClick={handleTileClick}
      >
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
        {/* <div>
          <FaHeart
            id="car-heart"
            className={heartClick ? "heart-clicked" : ""}
            onClick={handleHeartClick}
          />
        </div> */}
        <FavHeart
          id="car-heart"
          className={heartClick ? "heart-clicked" : ""}
          onClick={(event) => {
            event.stopPropagation();
            handleHeartClick();
          }}
          car={car}
          favorites={favorites} //carhearts add here
        />

        <div
          id="car-price-container"
          //   onClick={() => history.push(`/cars/${car.id}`)}
          onClick={handleTileClick}
        >
          <h3>{`$${car.dailyRate}/day`}</h3>
          <p>{`$${car.dailyRate} est. total`}</p>
        </div>
      </div>
    </div>
  );
};
export default CarSearchIndexItem;
