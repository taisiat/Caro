import "./FavoriteIndexItem.css";
import { AiTwotoneStar } from "react-icons/ai";
import { IoRibbonSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Spinner from "../../Spinner";

const FavoriteIndexItem = ({ favorite }) => {
  const car = favorite.car;
  const history = useHistory();
  const currentSearchParams = new URLSearchParams(window.location.search);

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

  const handleTileClick = () => {
    currentSearchParams.delete("viewport");
    currentSearchParams.set("zoom", 17);
    history.push({
      pathname: `/cars/${car.id}`,
      search: currentSearchParams.toString(),
    });
  };

  return (
    <div id="fav-index-item-container" onClick={handleTileClick}>
      <div id="fav-image-container">
        {car.photosUrl && (
          <img
            src={car.photosUrl[0]}
            alt="Car picture"
            className="fav-index-item-tile"
          />
        )}
      </div>
      <div id="fav-tile-info" onClick={handleTileClick}>
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
        <div id="fav-price-container" onClick={handleTileClick}>
          <h3>{`$${car.dailyRate} / day`}</h3>
        </div>
      </div>
    </div>
  );
};
export default FavoriteIndexItem;
