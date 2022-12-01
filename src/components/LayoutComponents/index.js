import React from "react";
import "./styles.css";

function LayoutComponents(props) {
    return (
        <div className="container"> 
            <div className="container-login">
                <div className="wrap-login">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LayoutComponents;