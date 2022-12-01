import React, { useContext } from "react";
import "./styles.css";
import ButtonLogout from "../ButtonLogout";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

function MenuDropdown() {
    const { logger } = useContext(AuthContext);
    return (
        <>
            <div className="dropdown-menu">
                <h4>MENU</h4>
                <ul className="dropdown">
                    <li>
                        <Link style={{ textDecoration: 'none' }} to="/">Inicio</Link>
                    </li> 
                    <li>
                        <Link style={{ textDecoration: 'none' }} to="/sobre">Sobre</Link>
                    </li>
                    <li>
                        <Link style={{ textDecoration: 'none' }} to="/contato">Contato</Link>
                    </li>
                    <li> <hr></hr> </li>
                    <li>{logger}</li>
                    <li><ButtonLogout /></li>
                </ul>
            </div>
        </>
    )
}

export default MenuDropdown;