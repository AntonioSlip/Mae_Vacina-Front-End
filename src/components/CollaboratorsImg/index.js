import React from "react";
import imagem from "../../assets/imagem.png";
import imagem2 from "../../assets/imagem2.png";
import imagem3 from "../../assets/imagem3.png";
import "./styles.css";

function CollaboratorsImg() {
    return (
        <>  
            <div className="boxCollaborators">
                <div className="ring1">
                    <img src={imagem} alt="1" />
                    <span></span>
                </div>
                <div className="ring1">
                    <img src={imagem2} alt="2" />
                    <span></span>
                </div>
                <div className="ring1">
                    <img src={imagem3} alt="3" />
                    <span></span>
                </div>
            </div>
        </>
    )
}

export default CollaboratorsImg;