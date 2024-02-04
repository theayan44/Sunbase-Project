import { useState } from "react";
import Button from "../Common/Button";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (loginId.trim().length == 0 && password.length == 0) {
      setError(true);
    } else {
      const loginCredentials = {
        "login_id": loginId,
        "password": password,
      }
      localStorage.setItem("loginCredentials", JSON.stringify(loginCredentials));
      navigate("/dashboard", { replace: true });
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <div className={style.container}>
        <h2>Login to your account</h2>

        <div className={style.input_field}>
          <label htmlFor="login_id">Login ID</label>
          <input required type="text" name="login_id" value={loginId} onChange={(e) => setLoginId(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <Button text={"CONTINUE"} />

        {
          error && <p className={style.error_message}>Error: All fields are mandatory!</p>
        }

      </div>
    </form>
  )
}

export default LoginForm;