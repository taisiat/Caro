import csrfFetch from "./csrf.js";

const SET_CARS = "cars/setCars";
const ADD_CAR = "cars/addCar";

const setCars = (cars) => ({
  type: SET_CARS,
  payload: cars,
});

export const addCar = (car) => ({
  type: ADD_CAR,
  payload: car,
});

// export const fetchCars = () => async (dispatch) => {
//   const response = await csrfFetch(`/api/cars`);
//   const data = await response.json();
//   dispatch(setCars(data.cars));
//   return response;
// };

export const fetchCars = (filters) => async (dispatch) => {
  const filterParams = new URLSearchParams(filters);
  const response = await csrfFetch(`/api/cars/?${filterParams}`);
  console.log("filterParams", filterParams);
  const data = await response.json();
  dispatch(setCars(data.cars));
  return response;
};

export const fetchCar = (carId) => async (dispatch) => {
  const response = await csrfFetch(`/api/cars/${carId}`);
  const data = await response.json();
  dispatch(addCar(data.car));
  return response;
};

export const createCar = (carFormData) => async (dispatch) => {
  const response = await csrfFetch("/api/cars", {
    method: "POST",
    body: carFormData,
  });
  const data = await response.json();
  dispatch(addCar(data.car));
  return response;
};

function carsReducer(state = {}, action) {
  switch (action.type) {
    case SET_CARS:
      return action.payload;
    case ADD_CAR:
      const car = action.payload;
      return { ...state, [car.id]: car };
    default:
      return state;
  }
}

export default carsReducer;
