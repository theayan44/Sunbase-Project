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

    // first check the id and password are not blank
    if (loginId.trim().length == 0 || password.length == 0) {
      //if any of them not entered then show error message
      setError(true);
    } else {

      //prepare the loginCredentials object and save it in localstorage for future reference
      const loginCredentials = {
        "login_id": loginId,
        "password": password,
      }
      localStorage.setItem("loginCredentials", JSON.stringify(loginCredentials));

      // after login navigate to dashboard page
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
          // if there is error then only show the error message
          error && <p className={style.error_message}>Error: All fields are mandatory!</p>
        }

      </div>
    </form>
  )
}

export default LoginForm;