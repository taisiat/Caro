import "./Footer.css";
import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div id="splash-footer">
      <div id="footer-icons-container">
        <p>TAISIA KARASEVA</p>
        <a
          className="footer-link"
          href="https://github.com/taisiat/Caro.git"
          target="_blank"
        >
          <GoMarkGithub />
        </a>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/taisiakaraseva/"
          target="_blank"
        >
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
