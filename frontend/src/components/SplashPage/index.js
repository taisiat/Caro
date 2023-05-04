import Footer from "../Footer";
import SearchBar from "../SearchBar";
import Spinner from "../Spinner";
import BrowseByDestinationComponent from "./BrowseByDestinationComponent";
import BrowseByExperienceComponent from "./BrowseByExperienceComponent";
import "./SplashPage.css";
import { useEffect, useState } from "react";

const SplashPage = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     setIsLoading(false);
  //   });
  // }, []);

  // if (isLoading) return <Spinner />;
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
      <SearchBar />
      <BrowseByDestinationComponent />
      <BrowseByExperienceComponent />
      <Footer />
    </>
  );
};

export default SplashPage;
