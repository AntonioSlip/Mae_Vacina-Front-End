import React from "react";
import "./styles.css";

function CopyRight() {
    const date = new Date();
    return (
        <>
            <footer className="copy">
                <div className="right">
                    <p>Copyright &copy; Mãe-Vacina {String(date.getFullYear())}</p>
                </div>
            </footer>
        </>
    )
}

export default CopyRight;