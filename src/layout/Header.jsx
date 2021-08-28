import { useState } from "react"
import { Link } from "react-router-dom"
import jamixLogo from "../assets/jamix-logo.png"

export default function Header({setMenuModal}) {


  return (
    <header>
      <img src={jamixLogo} alt="jamix-logo" />
      {/* Destop / Tablet Menu */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      {/* Mobile Menu */}
      <div
        class="hamburger-menu-toggler"
        onClick={() => setMenuModal(true)}
      >
        <div class="hamburger-menu-bar"></div>
        <div class="hamburger-menu-bar"></div>
        <div class="hamburger-menu-bar"></div>
      </div>
    </header>
  )
}
