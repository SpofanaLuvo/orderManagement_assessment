import { Link } from "react-router-dom";
import { useState } from "react";
import "./navigationBar.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className='logo'>
                <h2>OffiXer</h2>
            </div>
            <div
                className={`menu-btn ${isMenuOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                <div className='menu-btn__burger'></div>
            </div>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                <li>
                    <Link to='/'>Store</Link>
                </li>
                <li>
                    <Link to='/orders'>My Orders</Link>
                </li>
            </ul>
            {isMenuOpen && (
                <div className='modal' onClick={toggleMenu}>
                    <div className='modal-content'>
                        <Link to='/store'>Store</Link>
                        <Link to='/my-order'>My Order</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
