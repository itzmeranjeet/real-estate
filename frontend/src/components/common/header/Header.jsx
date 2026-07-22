import React, { useState, useContext } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"
import { AppContext } from "../../../context/AppContext"

const Header = () => {
  const [navList, setNavList] = useState(false)
  const { favorites, currentUser, handleLogout, setActiveModal } = useContext(AppContext)

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo.png' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path} onClick={() => setNavList(false)}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <h4 style={{ cursor: "pointer" }} onClick={() => setActiveModal("mylist")}>
              <span>{favorites.length}</span> My List
            </h4>
            {currentUser ? (
              <div className='user-info flex' style={{ gap: "10px", alignItems: "center" }}>
                <span style={{ fontWeight: "600", color: "#2d3436", fontSize: "14px" }}>Hi, {currentUser.name.split(" ")[0]}</span>
                <button className='btn1' onClick={handleLogout} style={{ border: "none" }}>
                  <i className='fa fa-sign-out'></i> Log Out
                </button>
              </div>
            ) : (
              <button className='btn1' onClick={() => setActiveModal("login")} style={{ border: "none" }}>
                <i className='fa fa-sign-in'></i> Sign In
              </button>
            )}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
