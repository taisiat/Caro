import typeDelux from "./image_experience_deluxesuperdeluxe.jpg";
import typeElectric from "./image_experience_electric.jpg";
import typeAllWheel from "./image_experience_allwheeldrive.jpg";

const BrowseByExperienceComponent = () => {
  return (
    <div id="experience-container">
      <h1 className="browse-by-tagline">Browse By Experience</h1>
      <div className="categories">
        <div className="car-type-container">
          <img src={typeDelux} alt="Delux cars" className="car-type-tile" />
          <p>Deluxe & Super Deluxe</p>
        </div>
        <div className="car-type-container">
          <img
            src={typeElectric}
            alt="Electric cars"
            className="car-type-tile"
          />
          <p>Electric</p>
        </div>
        <div className="car-type-container">
          <img
            src={typeAllWheel}
            alt="All wheel drive cars"
            className="car-type-tile"
          />
          <p>All-Wheel Drive</p>
        </div>
      </div>
    </div>
  );
};
export default BrowseByExperienceComponent;
