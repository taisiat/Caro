import csrfFetch from "./csrf.js";

const SET_REVIEWS = "reviews/setReviews";
const ADD_REVIEW = "reviews/addReview";
const REMOVE_REVIEW = "reviews/removeReview";

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId,
});

export const fetchReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews`);
  const data = await response.json();
  dispatch(setReviews(data.reviews));
  return response;
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`);
  const data = await response.json();
  dispatch(addReview(data.review));
  return response;
};

export const createReview = (reviewFormData) => async (dispatch) => {
  const response = await csrfFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(reviewFormData),
  });
  const data = await response.json();

  dispatch(addReview(data.review));
  return response;
};

export const updateReview = (reviewFormData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewFormData.reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(reviewFormData),
  });
  const data = await response.json();
  dispatch(addReview(data.review));
  return response;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  dispatch(removeReview(reviewId));
  return response;
};

function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.payload;
    case ADD_REVIEW:
      const review = action.payload;
      return { ...state, [review.id]: review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
