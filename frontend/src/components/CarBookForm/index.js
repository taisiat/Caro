import "./CarBookForm.css";
const CarBookForm = ({ car }) => {
  return (
    <>
      <div id="car-show-price-container">
        <h3>{`$${car.dailyRate} / day`}</h3>
        <p>{`$${car.dailyRate}  total`}</p>
      </div>
      <div id="search-car-show-container">
        <div id="where-container-car-show">
          <p>Pickup & return location</p>
          <h3>{car.location}</h3>
        </div>
      </div>
      <form>
        {/* <div id="from-container-car-show"> */}
        <p className="form-field-title">Trip start</p>
        <div id="from-input-container-car-show">
          <input
            type="date"
            className="search-input-car-show search-date"
          ></input>
        </div>
        {/* </div> */}
        {/* <div id="until-container-car-show"> */}
        <p className="form-field-title">Trip end</p>
        <div id="until-input-container-car-show">
          <input
            type="date"
            className="search-input-car-show search-date"
          ></input>
        </div>
        {/* </div> */}
        {/* <div id="trip-insurance-car-show"> */}
        <p className="form-field-title">Please select a protection plan</p>
        <div id="trip-insurance-input-container-car-show">
          <select className="search-input-car-show">
            <option disabled>Plans:</option>
            <option>
              Premier: Chill out and drive happy with the maximum coverage plan.
            </option>
            <option>
              Standard: Hit the road confidently with solid protection.
            </option>
            <option>Minimum: Stay covered while pinching some pennies.</option>
          </select>
        </div>
        {/* </div> */}
        <div>
          <button id="book-car-button">Book this car</button>
        </div>
      </form>
    </>
  );
};

export default CarBookForm;
