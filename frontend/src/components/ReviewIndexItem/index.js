import "./ReviewIndexItem.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { AiFillStar } from "react-icons/ai";
import { fetchUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ReviewIndexItem = ({ review }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(fetchUser(sessionUser.id));
  // }, [dispatch, sessionUser]);

  const dateFormat = (utcDateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const utcDate = new Date(utcDateString);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    const localDateString = localDate.toLocaleString("en-US", options);
    return localDateString;
  };

  const reviewerPic = () => {
    if (review.driver.photoUrl) {
      return (
        <img
          src={review.driver.photoUrl}
          alt="Reviewer picture"
          id="reviewer-profile-pic"
        />
      );
    } else {
      return (
        // <img
        //   src="https://i.imgur.com/2WZtvr7.png"
        //   alt="Reviewer picture"
        //   id="reviewer-profile-pic"
        <VscAccount id="reviewer-profile-pic" />
        // />
      );
    }
  };

  const starIcon = (rating, idx) => {
    return (
      <div
        key={idx}
        className={rating >= idx ? "review-star-filled" : "review-star-empty"}
      >
        <AiFillStar id="review-star" />
      </div>
    );
  };

  return (
    <div id="review-index-item-container">
      <div>
        <div
          id="review-driver-image-container"
          onClick={() => history.push(`/users/${review.driver.id}`)}
        >
          {reviewerPic()}
        </div>
      </div>
      <div id="review-tile-info">
        <div id="star-and-delete-container">
          <div id="review-star-rating-show">
            {[1, 2, 3, 4, 5].map((idx) =>
              starIcon(Math.ceil(review.averageRating), idx)
            )}
          </div>
          <div>
            {sessionUser?.id === review.driver.id && (
              <button
                id="revise-own-review-button"
                onClick={() => history.push(`/reviews/${review.id}`)}
              >
                Update or delete my review
              </button>
            )}
          </div>
        </div>
        <div id="reviewer-name-joined-info">
          <p id="reviewer-name-p">{review.driver.firstName}</p>
          <p id="review-create-p">{dateFormat(review.updatedAt)}</p>
        </div>
        <div id="review-text-container">
          <p id="review-text">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};
export default ReviewIndexItem;
