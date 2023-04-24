import cityLV from "./city_lv.png";
import citySF from "./city_sf.png";
import citySeattle from "./city_seattle.png";

const BrowseByDestinationComponent = () => {
  return (
    <div id="destination-container">
      <h1 className="browse-by-tagline">Browse By Destination</h1>
      <div className="categories">
        <div className="categories-box">
          <img src={citySF} alt="San Francisco" className="browse-by-tile" />
          <p>San Francisco</p>
        </div>
        <div className="categories-box">
          <img src={citySeattle} alt="Seattle" className="browse-by-tile" />
          <p>Seattle</p>
        </div>
        <div className="categories-box">
          <img src={cityLV} alt="Las Vegas" className="browse-by-tile" />
          <p>Las Vegas</p>
        </div>
      </div>
    </div>
  );
};
export default BrowseByDestinationComponent;
