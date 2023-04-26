import { FaHeart } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";

const FavHeart = () => {
  const [heartClick, setHeartClick] = useState(false);

  const handleHeartClick = () => {
    setHeartClick(!heartClick);
  };

  return (
    <div>
      <FaHeart
        id="car-heart"
        className={heartClick ? "heart-clicked" : ""}
        onClick={handleHeartClick}
      />
    </div>
  );
};

export default FavHeart;
