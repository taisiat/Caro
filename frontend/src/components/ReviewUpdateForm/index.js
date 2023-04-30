import "./ReviewUpdateForm.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateReview } from "../../store/reviews";
import {
  Redirect,
  __esModule,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import CarSearchIndexItem from "../CarSearchIndexItem";
import { fetchUser } from "../../store/user";
import { fetchReview } from "../../store/reviews";
import { useEffect } from "react";
import SearchLine from "../SearchLine";
import StarRatingInput from "../ReviewCreateForm/stars";
import Spinner from "../Spinner";
import { deleteReview } from "../../store/reviews";

const ReviewUpdateForm = () => {
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
  const { reviewId } = useParams();
  const review = useSelector((state) => state.reviews[reviewId]);

  useEffect(() => {
    dispatch(fetchReview(reviewId));
    // dispatch(fetchUser(sessionUser.id));
  }, [dispatch, reviewId]);

  useEffect(() => {
    if (review) {
      setStarRating(review.starRating);
      setCleanlinessRating(review.cleanlinessRating);
      setMaintenanceRating(review.maintenanceRating);
      setCommunicationRating(review.communicationRating);
      setConvenienceRating(review.convenienceRating);
      setAccuracyRating(review.accuracyRating);
      setComment(review.comment);
    }
  }, [review]);

  if (!sessionUser) {
    history.push("/");
    return;
  }

  const isLoading = !review || !sessionUser;

  if (isLoading) {
    return <Spinner />;
  }

  if (sessionUser && review.driverId !== sessionUser.id) {
    history.push("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const reviewData = {
      //   carId: car.id,
      reviewId: review.id,
      starRating,
      cleanlinessRating,
      maintenanceRating,
      communicationRating,
      convenienceRating,
      accuracyRating,
      comment,
    };

    try {
      await dispatch(updateReview(reviewData));
      history.push(`/cars/${review.car.id}`);
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

  //   const onChangeOverallRating = (number) => {
  //     setStarRating(parseInt(number));
  //   };

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

  //   if (!car) return <Spinner />;

  //   if (car && sessionUser)
  //     if (car.hostId === sessionUser.id) {
  //       history.push(`/cars/${car.id}`);
  //       return;
  //     }

  const handleReviewDelete = () => {
    dispatch(deleteReview(review.id));
    history.push(`/cars/${review.car.id}`);
  };

  return (
    <>
      <SearchLine />
      <div id="create-review-container">
        <h2 id="review-header">Revise your review for this car</h2>
        <div id="create-review-car-tile-container">
          <CarSearchIndexItem
            className="car-tile"
            id="car-tile-review"
            car={review.car}
          />
        </div>
        <form onSubmit={handleSubmit} id="create-review-form">
          <div id="review-inputs">
            <div id="star-inputs-container">
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
                  value={comment}
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
            <button id="create-review-button">Update car review</button>
          </div>
        </form>
        <div id="delete-review-button-container">
          <button id="delete-review-button" onClick={handleReviewDelete}>
            Delete car review
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewUpdateForm;
