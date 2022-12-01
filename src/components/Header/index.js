import React from "react";
import logo from "../../assets/logo.png";
import "./styles.css";
import MenuDropdown from "../MenuDropdown";
import ChatBot from "../ChatBot";

function Header() {
    return (
        <>
            <div className="header">
                <img src={logo} alt="logo"/>
                <MenuDropdown />
            </div>
            <ChatBot />
        </>
    )
}

export default Header;