import React from "react";
import CarSearchIndexItem from "../CarSearchIndexItem";

function CarList({
  cars,
  highlightedCar,
  setHighlightedCar,
  favorites,
  searchPageFromDate,
  searchPageUntilDate,
}) {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarSearchIndexItem
          key={car.id}
          className="car-tile"
          car={car}
          isHighlighted={highlightedCar === car.id}
          setHighlightedCar={setHighlightedCar}
          favorites={favorites}
          searchPageFromDate={searchPageFromDate}
          searchPageUntilDate={searchPageUntilDate}
        />
      ))}
    </div>
  );
}

export default CarList;
