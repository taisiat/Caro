import cityLV from "./city_lv.png";
import citySF from "./city_sf.png";
import citySeattle from "./city_seattle.png";
import { useHistory } from "react-router-dom";

const BrowseByDestinationComponent = () => {
  const history = useHistory();

  const handleSFClick = () => {
    // localStorage.setItem("cityCoords", [37.773972, -122.431297])
    localStorage.setItem(
      "cityCoords",
      JSON.stringify({
        lat: 37.773972,
        lng: -122.431297,
      })
    );
    localStorage.setItem("cityZoom", 12);
    history.push("/cars");
  };

  const handleSeattleClick = () => {
    // localStorage.setItem("cityCoords", [47.6062, -122.3321]);
    localStorage.setItem(
      "cityCoords",
      JSON.stringify({
        lat: 47.6062,
        lng: -122.3321,
      })
    );
    localStorage.setItem("cityZoom", 11);
    history.push("/cars");
  };

  const handleLVClick = () => {
    // localStorage.setItem("cityCoords", [36.1369025286101, -115.13567472862186]);
    localStorage.setItem(
      "cityCoords",
      JSON.stringify({
        lat: 36.1369025286101,
        lng: -115.13567472862186,
      })
    );
    localStorage.setItem("cityZoom", 12);
    history.push("/cars");
  };

  return (
    <div id="destination-container">
      <h1 className="browse-by-tagline">Browse By Destination</h1>
      <div className="categories">
        <div className="categories-box" onClick={handleSFClick}>
          <img src={citySF} alt="San Francisco" className="browse-by-tile" />
          <p>San Francisco</p>
        </div>
        <div className="categories-box" onClick={handleSeattleClick}>
          <img src={citySeattle} alt="Seattle" className="browse-by-tile" />
          <p>Seattle</p>
        </div>
        <div className="categories-box" onClick={handleLVClick}>
          <img src={cityLV} alt="Las Vegas" className="browse-by-tile" />
          <p>Las Vegas</p>
        </div>
      </div>
    </div>
  );
};
export default BrowseByDestinationComponent;
