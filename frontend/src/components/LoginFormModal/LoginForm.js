import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

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
      }
    );
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ email: "dom@toretto.com", password: "password1" })
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
          <button id="demo-button" type="submit" onClick={handleDemo}>
            Log in as Dom Torreto
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
