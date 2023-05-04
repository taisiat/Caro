import csrfFetch from "./csrf.js";

const SET_USERS = "users/setUsers";
const ADD_USER = "users/addUser";

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const fetchUsers = (filters) => async (dispatch) => {
  const filterParams = new URLSearchParams(filters);
  const response = await csrfFetch(`/api/users?${filterParams}`);
  const data = await response.json();
  dispatch(setUsers(data.users));
  return response;
};

export const fetchUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const data = await response.json();
  dispatch(addUser(data.user));
  return response;
};

function usersReducer(state = {}, action) {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case ADD_USER:
      const user = action.payload;
      return { ...state, [user.id]: user };
    default:
      return state;
  }
}

export default usersReducer;
