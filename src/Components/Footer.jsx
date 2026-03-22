import logo from "../assets/header1.png"
import { Github, Instagram } from "lucide-react";
import "../Styles/Footerstyling.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
    <div className="footer">
      <div className="leftfoot">
        <img src={logo} className="logofoot"/>
        </div>
        <div>© 2026 Remote Internship Platform | SATISHTEJA
        <a href="https://github.com/SATISHTEJA/FSADInternship">
          <Github size={24} className="icon"/>
        </a>
        </div>
      <div className="rightfoot">
        <Link to="/about" className="refers">About</Link>
        <Link to="/contact" className="refers">Contact</Link>
      </div>
    </div>
    </>
  );
};

export default Footer;