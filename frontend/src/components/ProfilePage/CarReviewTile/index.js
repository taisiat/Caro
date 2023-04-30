import "./CarReviewTile.css";
import { useHistory } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCar } from "react-icons/ai";

const CarReviewTile = ({ review }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const dateFormat = (utcDateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const utcDate = new Date(utcDateString);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    const localDateString = localDate.toLocaleString("en-US", options);
    return localDateString;
  };

  const carPic = () => {
    if (review.car.photosUrl) {
      return (
        <img
          src={review.car.photosUrl[0]}
          alt="Car picture"
          id="car-profile-pic"
        />
      );
    } else {
      return <AiFillCar id="car-profile-pic" />;
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
          onClick={() => history.push(`/cars/${review.car.id}`)}
        >
          {carPic()}
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
export default CarReviewTile;
