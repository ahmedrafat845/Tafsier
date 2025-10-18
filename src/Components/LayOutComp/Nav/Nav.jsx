import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={`${style.Nav} navbar  navbar-expand-lg text-white`}>
      <div className="container-fluid">
        <Link className={`${style.navBrand} navbar-brand`} >تفسير</Link>
        <button
          className={`${style.navToggler} navbar-toggler`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">الصفحه الرئيسيه</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link text-white" to="/quran">القران الكريم والتفسير</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/tafsier">Tafsier</Link>
            </li> */}
          
          </ul>
        </div>
      </div>
    </nav>
  );
}
