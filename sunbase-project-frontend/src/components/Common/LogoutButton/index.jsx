import { useNavigate } from "react-router-dom";
import Button from "../Button";
import style from "./style.module.css";

const LogoutButton = () => {

    const navigate = useNavigate();

    function handleLogout(e) {
        if (localStorage.getItem("loginCredentials") !== null) {
            localStorage.removeItem("loginCredentials");
            alert("You've been logeed out!");
            navigate("/", { replace: true });
        }
    }

    return (
        <div onClick={(e) => handleLogout(e)} className={style.logout_div}>
            <Button text={"Log Out"}></Button>
        </div>
    )
}

export default LogoutButton