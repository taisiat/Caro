import typeDelux from "./image_experience_deluxesuperdeluxe.jpg";
import typeElectric from "./image_experience_electric.jpg";
import typeAllWheel from "./image_experience_allwheeldrive.jpg";
import "./BrowseByExperienceComponent.css";

const BrowseByExperienceComponent = () => {
  return (
    <div id="experience-container">
      <h1 className="browse-by-tagline">Browse By Experience</h1>
      <div className="categories">
        <div className="car-type-container">
          <div className="experience-img-container">
            <img src={typeDelux} alt="Delux cars" className="car-type-tile" />
          </div>
          <p>Deluxe & Super Deluxe</p>
        </div>
        <div className="car-type-container">
          <div className="experience-img-container">
            <img
              src={typeElectric}
              alt="Electric cars"
              className="car-type-tile"
            />
          </div>
          <p>Electric</p>
        </div>
        <div className="car-type-container">
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
