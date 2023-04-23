import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormPage";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
        console.log(errors, "errors");
      }
    );
  };

  return (
    <div id="login-container">
      <h1 id="welcome-header">Welcome back</h1>
      <form onSubmit={handleSubmit} id="login-form">
        <ul id="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div id="email-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="login-input"
            // className={`inputs ${errors == ![] ? "red-input" : ""}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="password-container">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            className="login-input"
            // className={`inputs ${errors == ![] ? "red-input" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div id="button-container">
          <button id="login-button" type="submit">
            Log in
          </button>
        </div>
      </form>
      <div id="other-option-container">
        <p>Don’t have an account?</p>
        <SignupFormModal />
      </div>
    </div>
  );
}

export default LoginForm;
