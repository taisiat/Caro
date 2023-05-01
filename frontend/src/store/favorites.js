import csrfFetch from "./csrf.js";

const SET_FAVORITES = "favorites/setFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const REMOVE_FAVORITE = "favorites/removeFavorite";

const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

export const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  payload: favoriteId,
});

export const fetchFavorites = () => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites`);
  const data = await response.json();
  dispatch(setFavorites(data.favorites));
  return response;
};

export const fetchFavorite = (favoriteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${favoriteId}`);
  const data = await response.json();
  dispatch(addFavorite(data.favorite));
  return response;
};

export const createFavorite = (favoriteFormData) => async (dispatch) => {
  const response = await csrfFetch("/api/favorites", {
    method: "POST",
    body: JSON.stringify(favoriteFormData),
  });
  const data = await response.json();
  dispatch(addFavorite(data.favorite));
  return response;
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
  });
  dispatch(removeFavorite(favoriteId));
  return response;
};

function favoritesReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload;
    case ADD_FAVORITE:
      const favorite = action.payload;
      return { ...state, [favorite.id]: favorite };
    case REMOVE_FAVORITE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default favoritesReducer;
