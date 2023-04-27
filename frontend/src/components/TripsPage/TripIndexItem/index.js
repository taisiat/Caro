import "./TripIndexItem.css";

const TripIndexItem = ({ trip }) => {
  return (
    <>
      <p>{trip.id}</p>
      <p>{trip.driver.firstName}</p>
      <p>{trip.car.model}</p>
      <p>{trip.car.host.firstName}</p>
    </>
  );
};

export default TripIndexItem;
