import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./styles.css";

function ButtonLogout() {
    const {logout} = useContext(AuthContext);

    function handleLogout() {
        logout();
    }
    
    return (
        <div className="button">
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default ButtonLogout;