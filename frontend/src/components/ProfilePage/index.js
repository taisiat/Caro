import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import SearchLine from "../SearchLine";
import headerImage from "./profile_background_header.png";
import { VscAccount } from "react-icons/vsc";
import { VscVerified } from "react-icons/vsc";
import { VscUnverified } from "react-icons/vsc";
import { IoRibbonSharp } from "react-icons/io5";
import { MdCleanHands } from "react-icons/md";
import Footer from "../Footer";
import { AiTwotoneStar } from "react-icons/ai";
import Spinner from "../Spinner";
import { fetchReviews } from "../../store/reviews";
import ReviewIndexItem from "../ReviewIndexItem";
import CarReviewTile from "./CarReviewTile";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  //   const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  //   if (!sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (!user) {
    return <Spinner />;
  }

  const profileImg = () => {
    if (user.photoUrl) {
      // let profilePicNoCache =
      //   sessionUser.photoUrl + "?cache_buster=" + Date.now();
      // console.log(profilePicNoCache);
      return <img src={user.photoUrl} alt="profile picture" />;
    } else {
      return <VscAccount id="profile-page-placeholder-img" />;
    }
  };

  const monthYear = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const reviewsForCarsSection = () => {
    if (
      reviews &&
      reviews.filter((review) => review.car.host.id === user.id).length > 0
    ) {
      return reviews.map((review, idx) => {
        if (review.car.host.id === user.id)
          return <CarReviewTile review={review} key={idx} />;
      });
    } else {
      return <p>No reviews yet</p>;
    }
  };

  const reviewsForTripsSection = () => {
    if (
      reviews &&
      reviews.filter((review) => review.driver.id === user.id).length > 0
    ) {
      return reviews.map((review, idx) => {
        if (review.driver.id === user.id)
          return <CarReviewTile review={review} key={idx} />;
      });
    } else {
      return <p>No reviews yet</p>;
    }
  };

  return (
    <>
      <SearchLine />
      <div id="profile-page-container">
        <div id="profile-header-container">
          <img src={headerImage} />
        </div>
        <div id="profile-content-container">
          <div id="profile-and-user-star-container">
            <div id="profile-img-container">
              {profileImg()}
              <div id="user-rating-container">
                {parseInt(user.userRating).toFixed(1)}{" "}
                <AiTwotoneStar id="user-rating-star" />
              </div>
            </div>
          </div>
          <div id="profile-deets-reviews-container">
            <div id="profile-deets-container">
              <div id="profile-container-info">
                <h3>{`${user.firstName} ${user.lastName[0]}.`}</h3>
                <div id="profile-trips-joined">
                  <p>{`${user.tripsCount} ${
                    user.tripsCount === 1 ? "trip" : "trips"
                  }`}</p>
                  <p>{`Joined ${monthYear(user.createdAt)}`}</p>
                </div>
              </div>
            </div>
            <div id="profile-badges">
              {user.isSuperhost && (
                <div id="profile-superhost-clean">
                  <IoRibbonSharp className="profile-host-badge-icon" />
                  <p>
                    {`All-Star Hosts like ${user.firstName} are the top-rated and most experienced hosts on Caro.`}
                  </p>
                </div>
              )}
              {user.isCleanCertified && (
                <div id="user-clean">
                  <MdCleanHands className="profile-host-badge-icon" />
                  <p>
                    {`${user.firstName} has completed training on enhanced cleaning and disinfection practices.`}
                  </p>
                </div>
              )}
            </div>
            <div id="profile-verified-info">
              <h2 className="profile-mini-header">VERIFIED INFO</h2>
              <div className="profile-verifications">
                <p>Approved to drive</p>
                {user?.approvedToDrive ? (
                  <VscVerified className="profile-verified" />
                ) : (
                  <VscUnverified className="profile-unverified" />
                )}
              </div>
              <div className="profile-verifications">
                <p>Email address</p>
                {user?.email ? (
                  <VscVerified className="profile-verified" />
                ) : (
                  <VscUnverified className="profile-unverified" />
                )}
              </div>
              <div className="profile-verifications">
                <p>Phone number</p>
                {user?.phone ? (
                  <VscVerified className="profile-verified" />
                ) : (
                  <VscUnverified className="profile-unverified" />
                )}
              </div>
            </div>
          </div>
          <div id="reviews-deets-container">
            <h2 className="profile-mini-header">{`REVIEWS FOR ${user.firstName.toUpperCase()}'S CARS`}</h2>
            <div className="profile-review-index-container">
              {reviewsForCarsSection()}
            </div>
            <h2 className="profile-mini-header">{`${user.firstName.toUpperCase()}'S TRIP REVIEWS`}</h2>
            <div className="profile-review-index-container">
              {reviewsForTripsSection()}
            </div>
          </div>
        </div>
      </div>
      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
}

export default ProfilePage;
