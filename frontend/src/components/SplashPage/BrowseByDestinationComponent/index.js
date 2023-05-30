import cityLV from "./city_lv.png";
import citySF from "./city_sf.png";
import citySeattle from "./city_seattle.png";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BrowseByDestinationComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const cityOptions = {
    SF: {
      coords: {
        lat: 37.773972,
        lng: -122.431297,
      },
      zoom: 12,
      name: "SF",
      fullName: "San Francisco",
    },
    SEATTLE: {
      coords: {
        lat: 47.6062,
        lng: -122.3321,
      },
      zoom: 11,
      name: "SEATTLE",
      fullName: "Seattle",
    },
    LV: {
      coords: {
        lat: 36.1369025286101,
        lng: -115.13567472862186,
      },
      zoom: 12,
      name: "LV",
      fullName: "Las Vegas",
    },
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const handleCityClick = (city) => {
    // searchParams.set("coords", cityOptions[city].coords);
    searchParams.set(
      "coords",
      `${cityOptions[city].coords.lat},${cityOptions[city].coords.lng}`
    );
    searchParams.set("zoom", cityOptions[city].zoom);
    searchParams.set("dates", `${tomorrow},${dayAfter}`);
    searchParams.set("location", cityOptions[city].fullName);

    // history.push(`${location.pathname}?${searchParams.toString()}`);
    history.push({
      pathname: "/cars",
      search: searchParams.toString(),
    });
  };

  // const handleSFClick = () => {
  //   localStorage.setItem(
  //     "cityCoords",
  //     JSON.stringify({
  //       lat: 37.773972,
  //       lng: -122.431297,
  //     })
  //   );
  //   localStorage.setItem("cityZoom", 12);
  //   history.push("/cars");
  // };

  // const handleSeattleClick = () => {
  //   localStorage.setItem(
  //     "cityCoords",
  //     JSON.stringify({
  //       lat: 47.6062,
  //       lng: -122.3321,
  //     })
  //   );
  //   localStorage.setItem("cityZoom", 11);
  //   history.push("/cars");
  // };

  // const handleLVClick = () => {
  //   localStorage.setItem(
  //     "cityCoords",
  //     JSON.stringify({
  //       lat: 36.1369025286101,
  //       lng: -115.13567472862186,
  //     })
  //   );
  //   localStorage.setItem("cityZoom", 12);
  //   history.push("/cars");
  // };

  return (
    <div id="destination-container">
      <h1 className="browse-by-tagline">Browse By Destination</h1>
      <div className="categories">
        <div
          className="categories-box"
          onClick={() => handleCityClick(cityOptions.SF.name)}
        >
          <img src={citySF} alt="San Francisco" className="browse-by-tile" />
          <p>San Francisco</p>
        </div>
        <div
          className="categories-box"
          onClick={() => handleCityClick(cityOptions.SEATTLE.name)}
        >
          <img src={citySeattle} alt="Seattle" className="browse-by-tile" />
          <p>Seattle</p>
        </div>
        <div
          className="categories-box"
          onClick={() => handleCityClick(cityOptions.LV.name)}
        >
          <img src={cityLV} alt="Las Vegas" className="browse-by-tile" />
          <p>Las Vegas</p>
        </div>
      </div>
    </div>
  );
};
export default BrowseByDestinationComponent;
