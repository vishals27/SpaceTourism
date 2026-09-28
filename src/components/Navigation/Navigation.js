import React, { useState } from "react";
import './Navigation.css';
import logo from '../../assets/shared/logo.svg';
import cross from '../../assets/shared/icon-close.svg';
import { Link } from 'react-router-dom';

export default function NavBar({ activeClass = ["", "", "", "", ""] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [style, setStyle] = useState({});

    function hamburgerMenu() {
        if (!isOpen) {
            setIsOpen(true);
            setStyle({ transform: 'translate(0%)' });
        } else {
            setIsOpen(false);
            setStyle({ transform: 'translate(100%)' });
        }
    }

    return (
        <div className="NavBar flex">
            <Link to="/SpaceTourism/">
                <img src={logo} alt="Space tourism logo" className="logo-img"></img>
            </Link>
            <div className="nav-line"></div>

            <button 
                className="Navbar-toggle" 
                style={isOpen ? { backgroundImage: `url(${cross})` } : {}} 
                onClick={hamburgerMenu}
            >
                <span className="sr-only">Menu</span>
            </button>

            <nav>
                <ul style={style} className="primary-navigation linear-indicators flex fs-300 letter-spacing-2 ff-san-cond text-white upperCase">
                    <li className={activeClass[0]}>
                        <Link to="/SpaceTourism/"><span>00</span>Home</Link>
                    </li>
                    <li className={activeClass[1]}>
                        <Link to="/SpaceTourism/destination"><span>01</span>Destination</Link>
                    </li>
                    <li className={activeClass[2]}>
                        <Link to="/SpaceTourism/crew"><span>02</span>Crew</Link>
                    </li>
                    <li className={activeClass[3]}>
                        <Link to="/SpaceTourism/technology"><span>03</span>Technology</Link>
                    </li>
                    <li className={activeClass[4]}>
                        <Link to="/SpaceTourism/system"><span>04</span>System</Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}