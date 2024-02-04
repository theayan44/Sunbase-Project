import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // check if user already logged in or not
        if (localStorage.getItem("loginCredentials") !== null) {
            alert("You already logged in!");

            // if already logged in then navigate directly to dashboard
            navigate("/dashboard", { replace: true });
        }
    }, [])


    return (
        <div className="login-page">
            <LoginForm />
        </div>
    )
}

export default Login;