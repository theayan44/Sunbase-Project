import { useNavigate } from "react-router-dom";
import Button from "../Button";
import style from "./style.module.css";

const LogoutButton = () => {

    const navigate = useNavigate();

    function handleLogout(e) {
        // check user logged in or not
        if (localStorage.getItem("loginCredentials") !== null) {

            // remove the credentials from localStorage
            localStorage.removeItem("loginCredentials");
            alert("You've been logeed out!");

            // now navigate to login page
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