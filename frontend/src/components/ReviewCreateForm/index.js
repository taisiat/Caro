import "./ReviewCreateForm.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import {
  Redirect,
  __esModule,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import CarSearchIndexItem from "../CarSearchIndexItem";
import { fetchUser } from "../../store/user";
import { useEffect } from "react";
import SearchLine from "../SearchLine";
import StarRatingInput from "./stars";
import { fetchCar } from "../../store/cars";
import Spinner from "../Spinner";

const ReviewCreateForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [starRating, setStarRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [maintenanceRating, setMaintenanceRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [convenienceRating, setConvenienceRating] = useState(5);
  const [accuracyRating, setAccuracyRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const { carId } = useParams();
  const car = useSelector((state) => state.cars[carId]);

  useEffect(() => {
    dispatch(fetchCar(carId));
  }, [dispatch, carId]);

  //   useEffect(() => {
  //     dispatch(fetchUser(sessionUser.id));
  //   }, [dispatch]);

  if (!sessionUser) {
    history.push("/");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const reviewData = {
      carId: car.id,
      starRating,
      cleanlinessRating,
      maintenanceRating,
      communicationRating,
      convenienceRating,
      accuracyRating,
      comment,
    };

    try {
      await dispatch(createReview(reviewData));
      history.push(`/cars/${car.id}`);
    } catch (error) {
      let data;
      try {
        data = await error.clone().json();
      } catch {
        data = await error.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([error.statusText]);
    }
  };

  //   const onChange = (number,type) => {
  //     if (type === "overall") {
  //         setStarRating(parseInt(number))}
  //     else if (type === "cleanliness") {setCleanlinessRating(parseInt(number))}
  //     else if (type === "maintenance") {setMaintenanceRating(parseInt(number))}
  //     else if (type === "communication") {setCommunicationRating(parseInt(number))}
  //     else if (type === "convenience") {setConvenienceRating(parseInt(number))}
  //     else if (type === "accuracy") {setAccuracyRating(parseInt(number))}
  //   };

  const onChangeOverallRating = (number) => {
    setStarRating(parseInt(number));
  };

  const onChangeCleanlinessRating = (number) => {
    setCleanlinessRating(parseInt(number));
  };

  const onChangeMaintenanceRating = (number) => {
    setMaintenanceRating(parseInt(number));
  };

  const onChangeCommunicationRating = (number) => {
    setCommunicationRating(parseInt(number));
  };

  const onChangeConvenienceRating = (number) => {
    setConvenienceRating(parseInt(number));
  };

  const onChangeAccuracyRating = (number) => {
    setAccuracyRating(parseInt(number));
  };

  if (!car) return <Spinner />;

  if (car && sessionUser)
    if (car.hostId === sessionUser.id) {
      history.push(`/cars/${car.id}`);
      return;
    }

  return (
    <>
      <SearchLine />
      <div id="create-review-container">
        <h2 id="review-header">Leave a review for this car</h2>
        <div id="create-review-car-tile-container">
          <CarSearchIndexItem
            className="car-tile"
            id="car-tile-review"
            car={car}
          />
        </div>
        <form onSubmit={handleSubmit} id="create-review-form">
          <div id="review-inputs">
            <div id="star-inputs-container">
              {/* <div className="star-and-title-container">
                <p className="form-field-title-stars">Overall rating</p>
                <div id="form-input-overall-rating">
                  <StarRatingInput
                    disabled={false}
                    onChange={onChangeOverallRating}
                    rating={starRating}
                  />
                </div>
              </div> */}

              <div className="star-and-title-container">
                <p className="form-field-title-stars">Cleanliness</p>
                <div id="form-input-cleanliness">
                  <StarRatingInput
                    disabled={false}
                    s
                    onChange={onChangeCleanlinessRating}
                    rating={cleanlinessRating}
                  />
                </div>
              </div>

              <div className="star-and-title-container">
                <p className="form-field-title-stars">Maintenance</p>
                <div id="form-input-maintenance">
                  <StarRatingInput
                    disabled={false}
                    s
                    onChange={onChangeMaintenanceRating}
                    rating={maintenanceRating}
                  />
                </div>
              </div>

              <div className="star-and-title-container">
                <p className="form-field-title-stars">Communication</p>
                <div id="form-input-communication">
                  <StarRatingInput
                    disabled={false}
                    s
                    onChange={onChangeCommunicationRating}
                    rating={communicationRating}
                  />
                </div>
              </div>

              <div className="star-and-title-container">
                <p className="form-field-title-stars">Convenience</p>
                <div id="form-input-convenience">
                  <StarRatingInput
                    disabled={false}
                    s
                    onChange={onChangeConvenienceRating}
                    rating={convenienceRating}
                  />
                </div>
              </div>

              <div className="star-and-title-container">
                <p className="form-field-title-stars">Accuracy</p>
                <div id="form-input-accuracy">
                  <StarRatingInput
                    disabled={false}
                    s
                    onChange={onChangeAccuracyRating}
                    rating={accuracyRating}
                  />
                </div>
              </div>
            </div>

            <div id="review-summary-container">
              <h2 className="form-field-title-stars" id="review-title-tag">
                Review
              </h2>
              <div id="form-input-review">
                <textarea
                  id="review-textarea"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          {errors.map((error) => (
            <p key={error} className="create-review-error">
              {error}
            </p>
          ))}
          <div>
            <button id="create-review-button">Publish car review</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewCreateForm;
