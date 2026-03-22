import React from 'react'
import '../Styles/Cardh.css'
import logo from '../assets/header1.png'
import { Link } from 'react-router-dom'


const HeaderMain = () => {
  return (
    <header className="header">
      <div className="left">
        <img
          src={logo}
          alt="KL University"
          className="logo"
        />
      </div>

      <div className="right">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </header>
  )
}

export default HeaderMain
