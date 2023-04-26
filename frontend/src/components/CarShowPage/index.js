import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarShowPage.css";
import { useParams } from "react-router-dom";
import { fetchCar } from "../../store/cars";
import SearchLine from "../SearchLine";
import FavHeart from "../FavHeart";
import Footer from "../Footer";
import { AiTwotoneStar } from "react-icons/ai";
import { BiGasPump } from "react-icons/bi";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { IoRibbonSharp } from "react-icons/io5";
import { MdCleanHands } from "react-icons/md";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

function CarShowPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const { carId } = useParams();
  const car = useSelector((state) => state.cars[carId]);
  const dispatch = useDispatch();
  const [currentImg, setCurrentImg] = useState(0);
  const imageListLength = car?.photosUrl ? car.photosUrl.length : 0;

  const handleImgSlider = (direction) => {
    handleChangeImage();
    setCurrentImg((prev) => {
      const rawIdx = (prev + direction) % imageListLength;
      return rawIdx < 0 ? rawIdx + imageListLength : rawIdx;
    });
  };

  useEffect(() => {
    dispatch(fetchCar(carId));
  }, [dispatch]);

  if (!car) {
    return null;
  }

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const handleChangeImage = () => {
    const imageContainer = document.getElementById("car-show-imgs-container");
    imageContainer.classList.add("image-transition");

    setTimeout(() => {
      imageContainer.classList.remove("image-transition");
    }, 500);
  };

  return (
    <div id="car-show-container">
      <SearchLine />
      <div id="car-show-heart-container">
        <FavHeart className="heart-car-show" />
      </div>
      <div id="car-show-imgs-container">
        {car.photosUrl && (
          <img
            src={car.photosUrl[currentImg]}
            alt="Car image picture"
            className="car-show-image"
            id="car-show-main-img"
          />
        )}

        {/* {car.photosUrl &&
          car.photosUrl.map((photoUrl, idx) => {
            return (
              <div
                className={
                  idx === currentImg
                    ? "car-show-slide active"
                    : "car-show-slide"
                }
                key={idx}
                alt="car image"
              >
                {idx === currentImg && (
                  <img src={photoUrl} className="car-show-image"></img>
                )}
              </div>
            );
          })} */}
      </div>
      <div id="img-sliders-container">
        <FaChevronCircleLeft onClick={() => handleImgSlider(-1)} />
        <FaChevronCircleRight onClick={() => handleImgSlider(1)} />
      </div>
      <div id="car-show-info-booking-container">
        <div id="car-show-info">
          <div id="car-title">
            <h1>{`${car.make} ${car.model} ${car.year}`}</h1>
            <div id="car-show-mini-rating">
              <h3>X</h3>
              <AiTwotoneStar id="car-show-rating-star" />
              <p>(X trips)</p>
            </div>
          </div>
          <div id="car-show-stats">
            <div id="car-show-stats-left">
              <h3>
                <BiGasPump /> {`${car.mpg} MPG`}
              </h3>
              <h3>
                <GiCarDoor /> {`${car.doorsCount} doors`}
              </h3>
            </div>
            <div id="car-show-stats-right">
              <h3>
                <GiCarSeat /> {`${car.seatsCount} seats`}
              </h3>
              <h3>
                <TbManualGearbox /> {car.automatic ? "Automatic" : "Manual"}
              </h3>
            </div>
          </div>
          <div id="car-show-host-info">
            <h2 className="car-show-section-header">HOSTED BY</h2>
            <div id="car-show-host-container">
              <div id="car-show-host-container-profile">
                <img src={car.host.photoUrl} alt="Host profile picture" />
              </div>
              <div id="car-show-host-container-info">
                <h3>{car.host.firstName}</h3>
                {car.host.isSuperhost && (
                  <p>
                    <IoRibbonSharp /> All-Star Host
                  </p>
                )}
                <div id="car-show-host-trips-joined">
                  <p>X trips</p>
                  <p>{`Joined ${monthYear(car.host.createdAt)}`}</p>
                </div>
              </div>
            </div>
            <div id="car-show-host-badges">
              {car.host.isSuperhost && (
                <div id="car-show-superhost-clean">
                  <IoRibbonSharp className="host-badge-icon" />
                  <p>
                    {`All-Star Hosts like ${car.host.firstName} are the top-rated and most experienced hosts on Caro.`}
                  </p>
                </div>
              )}
              {car.host.isCleanCertified && (
                <div id="car-show-superhost-clean">
                  <MdCleanHands className="host-badge-icon" />
                  <p>
                    {`${car.host.firstName} has completed training on enhanced cleaning and disinfection practices.`}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="car-show-section">
            <h2 className="car-show-section-header">DESCRIPTION</h2>
            <p className="car-host-paragraph">{car.description}</p>
          </div>
          <div className="car-show-section">
            <h2 className="car-show-section-header">FEATURES</h2>
          </div>
          <div className="car-show-section">
            <h2 className="car-show-section-header">RATINGS AND REVIEWS</h2>
            <div id="car-show-mini-rating">
              <h3>X</h3>
              <AiTwotoneStar id="car-show-rating-star" />
              <p>(X ratings)</p>
            </div>
          </div>
        </div>
        <div id="car-show-booking">
          <div id="car-show-price-container">
            <h3>{`$${car.dailyRate} / day`}</h3>
            <p>{`$${car.dailyRate}  total`}</p>
          </div>
          <div id="search-car-show-container">
            <form>
              <div id="where-container-car-show">
                <p>Pickup & return location</p>
                {/* <input className="search-input-car-show"></input> */}
                <h3>{car.location}</h3>
              </div>
              <div id="from-container-car-show">
                <p>Trip start</p>
                <div id="from-input-container-car-show">
                  <input
                    type="date"
                    className="search-input-car-show search-date"
                  ></input>
                  <input type="time" className="search-input-car-show"></input>
                </div>
              </div>
              <div id="until-container-car-show">
                <p>Trip end</p>
                <div id="until-input-container-car-show">
                  <input
                    type="date"
                    className="search-input-car-show search-date"
                  ></input>
                  <input type="time" className="search-input-car-show"></input>
                </div>
              </div>
              <div id="trip-insurance-car-show">
                <p>Please select a protection plan</p>
                <div id="trip-insurance-input-container-car-show">
                  <select className="search-input-car-show">
                    <option disabled>Plans:</option>
                    <option>
                      Premier: Chill out and drive happy with the maximum
                      coverage plan.
                    </option>
                    <option>
                      Standard: Hit the road confidently with solid protection.
                    </option>
                    <option>
                      Minimum: Stay covered while pinching some pennies.
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <button id="book-car-button">Book this car</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="car-show-map">
        <div id="map"></div>
      </div>
      <Footer />
    </div>
  );
}

export default CarShowPage;
