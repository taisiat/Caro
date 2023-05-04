import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({
        email: "dom@toretto.com",
        password: "password1",
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
        })
      ).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(["Passwords don't match. Please try again."]);
  };

  return (
    <div id="signup-modal-container">
      <h1>{"Let’s get started"}</h1>
      <form onSubmit={handleSubmit}>
        <div id="name-inputs">
          <div id="first-name-container">
            <label htmlFor="first-name"> First name </label>
            <input
              type="text"
              id="first-name"
              placeholder="required"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.map((error, idx) => {
              if (error.includes("First name")) {
                return (
                  <div className="error-message" key={idx}>
                    {error}
                  </div>
                );
              }
            })}
          </div>
          <div id="last-name-container">
            <label htmlFor="last-name"> Last name </label>
            <input
              type="text"
              id="last-name"
              placeholder="required"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.map((error, idx) => {
              if (error.includes("Last name")) {
                return (
                  <div className="error-message" key={idx}>
                    {error}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <p id="name-explainer">
          Enter your name as it appears on your driver’s license
        </p>
        <div className="input-container">
          {" "}
          <label htmlFor="email"> Email </label>
          <input
            id="email"
            type="text"
            placeholder="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.map((error, idx) => {
            if (error.includes("Email")) {
              return (
                <div className="error-message" key={idx}>
                  {error}
                </div>
              );
            }
          })}
        </div>
        <div className="input-container">
          {" "}
          <label htmlFor="phone-number"> Phone number </label>
          <input
            id="phone-number"
            type="text"
            placeholder="XXX-XXXX-XXXX (optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.map((error, idx) => {
            if (error.includes("Phone")) {
              return (
                <div className="error-message" key={idx}>
                  {error}
                </div>
              );
            }
          })}
        </div>
        <div className="input-container">
          {" "}
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            placeholder="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.map((error, idx) => {
            if (error.includes("Password ")) {
              return (
                <div className="error-message" key={idx}>
                  {error}
                </div>
              );
            }
          })}
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password"> Confirm password </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="required"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.map((error, idx) => {
            if (error.includes("Passwords don't match")) {
              return (
                <div className="error-message" key={idx}>
                  {error}
                </div>
              );
            }
          })}
        </div>
        <button type="submit" id="signup-button">
          Sign up
        </button>
        <button id="demo-button" type="submit" onClick={handleDemo}>
          Log in as Dom Torreto
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
