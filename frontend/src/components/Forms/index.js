import React from "react";

export function Input({ label, type = "text", ...inputProps }) {
  return (
    <label className="input">
      {label}
      <input type={type} {...inputProps} />
    </label>
  );
}

export function TextArea({ label, ...textAreaProps }) {
  return (
    <label className="input">
      {label}
      <textarea {...textAreaProps}></textarea>
    </label>
  );
}

export function FormErrors({ errors }) {
  return (
    <ul className="form-errors">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}
