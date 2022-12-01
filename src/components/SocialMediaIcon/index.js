import React from "react";
import "./styles.css";
import instagram from "../../assets/instagram.png";

function SocialMediaIcon() {
    return (
        <>  
            <div className="top">
                <h1>Siga a gente</h1>
                <div className="socialMedia">
                    <a href="https://www.instagram.com/vacinamae_ete/" target="_blank" rel="noreferrer">
                        <img src={instagram} alt="instagram" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default SocialMediaIcon;