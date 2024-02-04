import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("loginCredentials") !== null) {
            alert("You already logged in!");
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