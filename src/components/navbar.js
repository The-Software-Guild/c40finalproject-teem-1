import React from "react"
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
function NavBar() {
    return (
        <div className="nav_list">
       
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/mybar'>MyBar</Link></li>
                <li><Link to='/all'>All Drinks</Link></li>
            </ul>
        </div>
    );
}
 
export default NavBar