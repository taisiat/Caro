import SplashImage from "./splash_main.jpg";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <>
      <div className="splash-img-container"></div>
      <h1 id="leader-phrase">Find your drive</h1>
      <div id="leader-tagline-container">
        <p id="leader-tagline">
          Explore the world's largest car sharing marketplace
        </p>
        <div id="leader-tagline-color"> </div>
      </div>
    </>
  );
};

export default SplashPage;
