import typeDelux from "./image_experience_deluxesuperdeluxe.jpg";
import typeElectric from "./image_experience_electric.jpg";
import typeAllWheel from "./image_experience_allwheeldrive.jpg";
import "./BrowseByExperienceComponent.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BrowseByExperienceComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const experienceOptions = {
    Exotic: {
      // coords: {
      //   lat: 37.773972,
      //   lng: -122.431297,
      // },
      // zoom: 12,
      name: "Exotic",
    },
    Electric: {
      // coords: {
      //   lat: 47.6062,
      //   lng: -122.3321,
      // },
      // zoom: 11,
      name: "Electric",
    },
    AWD: {
      // coords: {
      //   lat: 36.1369025286101,
      //   lng: -115.13567472862186,
      // },
      // zoom: 12,
      name: "All-Wheel Drive",
    },
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const handleExperienceClick = (experience) => {
    searchParams.set("experience", experience);
    searchParams.set("dates", `${tomorrow},${dayAfter}`);

    history.push({
      pathname: "/cars",
      search: searchParams.toString(),
    });
  };

  // const handleDeluxClick = () => {
  //   localStorage.setItem("experience", "Exotic");
  //   history.push("/cars");
  // };

  // const handleElectricClick = () => {
  //   localStorage.setItem("experience", "Electric");
  //   history.push("/cars");
  // };

  // const handleAllWheelClick = () => {
  //   localStorage.setItem("experience", "All-Wheel Drive");
  //   history.push("/cars");
  // };

  return (
    <div id="experience-container">
      <h1 className="browse-by-tagline">Browse By Experience</h1>
      <div className="categories">
        <div
          className="car-type-container"
          // onClick={handleDeluxClick}
          onClick={() => handleExperienceClick(experienceOptions.Exotic.name)}
        >
          <div className="experience-img-container">
            <img src={typeDelux} alt="Delux cars" className="car-type-tile" />
          </div>
          <p>Deluxe & Super Deluxe</p>
        </div>
        <div
          className="car-type-container"
          onClick={() => handleExperienceClick(experienceOptions.Electric.name)}
          // onClick={handleElectricClick}
        >
          <div className="experience-img-container">
            <img
              src={typeElectric}
              alt="Electric cars"
              className="car-type-tile"
            />
          </div>
          <p>Electric</p>
        </div>
        <div
          className="car-type-container"
          onClick={() => handleExperienceClick(experienceOptions.AWD.name)}
          // onClick={handleAllWheelClick}
        >
          <div className="experience-img-container">
            <img
              src={typeAllWheel}
              alt="All wheel drive cars"
              className="car-type-tile"
            />
          </div>
          <p>All-Wheel Drive</p>
        </div>
      </div>
    </div>
  );
};
export default BrowseByExperienceComponent;
