import React from 'react'
import '../Styles/Header.css'
import logo from '../assets/header1.png'
import { Link, useNavigate } from 'react-router-dom'

const HeaderPages = () => {
  const navigate = useNavigate();
  return (
    <header className="headerpages">
      <div className="left">
        <img
          src={logo}
          alt="KL University"
          className="logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="right">
        <Link to="/" className="home">Home</Link>
        
      </div>
    </header>
  )
}

export default HeaderPages