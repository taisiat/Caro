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
      name: "Exotic",
    },
    Electric: {
      name: "Electric",
    },
    AWD: {
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
    searchParams.set("zoom", 5);

    history.push({
      pathname: "/cars",
      search: searchParams.toString(),
    });
  };

  return (
    <div id="experience-container">
      <h1 className="browse-by-tagline">Browse By Experience</h1>
      <div className="categories">
        <div
          className="car-type-container"
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
