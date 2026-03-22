import { Github } from "lucide-react";
import "../Styles/Footerstyling.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">

      <div className="leftfoot">
        <a
          href="https://github.com/SATISHTEJA/FSADInternship"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={22} className="icon" />
        </a>
      </div>

      <div className="centerfoot">
        © 2026 Remote Internship Platform | <strong>SATISHTEJA</strong>
      </div>

      <div className="rightfoot">
        <Link to="/about" className="refers">About</Link>
        <Link to="/contact" className="refers">Contact</Link>
      </div>

    </div>
  );
};

export default Footer;