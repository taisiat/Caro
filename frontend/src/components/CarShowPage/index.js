import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CarShowPage.css";
import { useParams } from "react-router-dom";
import { fetchCar } from "../../store/cars";
import SearchLine from "../SearchLine";
import FavHeart from "../FavHeart";
import { AiTwotoneStar } from "react-icons/ai";
import { BiGasPump } from "react-icons/bi";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { IoRibbonSharp } from "react-icons/io5";
import { MdCleanHands } from "react-icons/md";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import CarBookForm from "../CarBookForm";
import Spinner from "../Spinner";
import ReviewIndexItem from "../ReviewIndexItem";
import { VscAccount } from "react-icons/vsc";
import CarMap from "../CarMap";
import { fetchFavorites } from "../../store/favorites";

function CarShowPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const { carId } = useParams();
  const car = useSelector((state) => state.cars[carId]);
  const reviews = car ? Object.values(car.reviews) : null;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchPageWhere, setSearchPageWhere] = useState("");
  const fromDate = localStorage.getItem("fromDate");
  const untilDate = localStorage.getItem("untilDate");
  const where = localStorage.getItem("where");

  const dispatch = useDispatch();
  const [currentImg, setCurrentImg] = useState(0);
  const imageListLength = car?.photosUrl ? car.photosUrl.length : 0;
  const history = useHistory();
  const favorites = useSelector((state) => Object.values(state.favorites));

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

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

  useEffect(() => {
    if (fromDate) {
      setStartDate(fromDate);
    }
  }, [fromDate]);

  useEffect(() => {
    if (untilDate) {
      setEndDate(untilDate);
    }
  }, [untilDate]);

  useEffect(() => {
    if (where) {
      setSearchPageWhere(where);
    }
  }, [where]);

  if (!car) {
    return <Spinner />;
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

  const profileImg = () => {
    if (car.host && car.host.photoUrl) {
      return <img src={car.host.photoUrl} alt="profile picture" />;
    } else {
      return <VscAccount id="profile-page-placeholder-img" />;
    }
  };

  return (
    <div id="car-show-container">
      <SearchLine
        searchPageFromDate={startDate}
        setSearchPageFromDate={setStartDate}
        searchPageUntilDate={endDate}
        setSearchPageUntilDate={setEndDate}
        searchPageWhere={searchPageWhere}
        setSearchPageWhere={setSearchPageWhere}
      />
      <div id="car-show-heart-container">
        <FavHeart className="heart-car-show" car={car} favorites={favorites} />
      </div>{" "}
      // heartsedit
      <div id="car-show-imgs-container">
        {car.photosUrl && (
          <img
            src={car.photosUrl[currentImg]}
            alt="Car image picture"
            className="car-show-image"
            id="car-show-main-img"
          />
        )}
      </div>
      <div id="img-sliders-container">
        <FaChevronCircleLeft
          className="car-image-rotate-button"
          onClick={() => handleImgSlider(-1)}
        />
        <FaChevronCircleRight
          className="car-image-rotate-button"
          onClick={() => handleImgSlider(1)}
        />
      </div>
      <div id="car-show-info-booking-container">
        <div id="car-show-info">
          <div id="car-title">
            <h1>{`${car.make} ${car.model} ${car.year}`}</h1>
            <div className="rating-and-star-container">
              <h3 id="car-show-mini-rating">{avgCarRating()}</h3>
              <AiTwotoneStar id="car-show-rating-star" />
              <p>{`(${car.tripsCount} ${
                car.tripsCount === 1 ? "trip" : "trips"
              })`}</p>
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
              <div
                id="car-show-host-container-profile"
                onClick={() => history.push(`/users/${car.host.id}`)}
              >
                <div id="profile-and-user-star-container-car-show">
                  <div id="profile-img-container">
                    {profileImg()}
                    <div id="user-rating-container">
                      {parseInt(car.host.userRating).toFixed(1)}{" "}
                      <AiTwotoneStar id="user-rating-star" />
                    </div>
                  </div>
                </div>
              </div>
              <div id="car-show-host-container-info">
                <h3>{car.host.firstName}</h3>
                {car.host.isSuperhost && (
                  <p>
                    <IoRibbonSharp /> All-Star Host
                  </p>
                )}
                <div id="car-show-host-trips-joined">
                  <p>{`${car.host.tripsCount} ${
                    car.host.tripsCount === 1 ? "trip" : "trips"
                  }`}</p>
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
            <h2 className="car-show-section-header">GUIDELINES</h2>
            <p className="car-host-paragraph">{car.guidelines}</p>
          </div>
          <div className="car-show-section">
            <h2 className="car-show-section-header">RATINGS AND REVIEWS</h2>
            <div className="rating-and-star-container">
              <h3 id="car-show-big-rating">{avgCarRating()}</h3>
              <AiTwotoneStar id="car-show-rating-star" />
            </div>
            <p>{`(${car.reviewsCount} ${
              car.reviewsCount === 1 ? "review" : "reviews"
            })`}</p>
            <div id="ratings-bars-user-rating-container">
              <div className="ratings-bars-subcontainer">
                <h2 className="bar-container-label">Cleanliness</h2>
                <div className="bar-container">
                  <div className="rating-bar-gray"></div>
                  <div
                    className="rating-bar"
                    id="rating-bar--cleanliness"
                    style={{
                      "--cleanliness-rating": parseFloat(
                        car.avgCleanlinessRating || 0
                      ),
                    }}
                  />
                </div>
                <h2>{parseFloat(car.avgCleanlinessRating || 0).toFixed(1)}</h2>
              </div>

              <div className="ratings-bars-subcontainer">
                <h2 className="bar-container-label">Maintenance</h2>
                <div className="bar-container">
                  <div className="rating-bar-gray"></div>
                  <div
                    className="rating-bar"
                    id="rating-bar--maintenance"
                    style={{
                      "--maintenance-rating": parseFloat(
                        car.avgMaintenanceRating || 0
                      ),
                    }}
                  />
                </div>
                <h2>{parseFloat(car.avgMaintenanceRating || 0).toFixed(1)}</h2>
              </div>

              <div className="ratings-bars-subcontainer">
                <h2 className="bar-container-label">Communication</h2>
                <div className="bar-container">
                  <div className="rating-bar-gray"></div>
                  <div
                    className="rating-bar"
                    id="rating-bar--communication"
                    style={{
                      "--communication-rating": parseFloat(
                        car.avgCommunicationRating || 0
                      ),
                    }}
                  />
                </div>
                <h2>
                  {parseFloat(car.avgCommunicationRating || 0).toFixed(1)}
                </h2>
              </div>

              <div className="ratings-bars-subcontainer">
                <h2 className="bar-container-label">Convenience</h2>
                <div className="bar-container">
                  <div className="rating-bar-gray"></div>
                  <div
                    className="rating-bar"
                    id="rating-bar--convenience"
                    style={{
                      "--convenience-rating": parseFloat(
                        car.avgConvenienceRating || 0
                      ),
                    }}
                  />
                </div>
                <h2>{parseFloat(car.avgConvenienceRating || 0).toFixed(1)}</h2>
              </div>

              <div className="ratings-bars-subcontainer">
                <h2 className="bar-container-label">Accuracy</h2>
                <div className="bar-container">
                  <div className="rating-bar-gray"></div>
                  <div
                    className="rating-bar"
                    id="rating-bar--accuracy"
                    style={{
                      "--accuracy-rating": parseFloat(
                        car.avgAccuracyRating || 0
                      ),
                    }}
                  />
                </div>
                <h2>{parseFloat(car.avgAccuracyRating || 0).toFixed(1)}</h2>
              </div>
            </div>
            <div className="car-show-section">
              <h2 className="car-show-section-header">REVIEWS</h2>
              <div id="reviews-index-container">
                {reviews && reviews !== [] && reviews.length > 0 ? (
                  reviews.map((review, idx) => {
                    return <ReviewIndexItem review={review} key={idx} />;
                  })
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="car-show-booking">
          <CarBookForm car={car} />
        </div>
      </div>
      <div id="car-show-map">
        <div id="map">
          <CarMap
            cars={[car]}
            mapOptions={{
              center: {
                lat: parseFloat(car.location[0]),
                lng: parseFloat(car.location[1]),
              },
              zoom: 17,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CarShowPage;
