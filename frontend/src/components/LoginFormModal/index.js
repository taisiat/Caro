import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "../SignupFormPage/SignupForm";

function LoginFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const toggle = () => {
    if (modalType === "signup") {
      return (
        <SignupForm
          onSignup={() => {
            setModalType("signup");
          }}
        />
      );
    } else if (modalType === "login") {
      return <LoginForm />;
    } else {
      return null;
    }
  };

  const showTypeModal = (type) => {
    setShowModal(true);
    setModalType(type);
  };
  return (
    <>
      <button className="nav-button" onClick={() => showTypeModal("login")}>
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {toggle()}
          <div id="other-option-container">
            {modalType === "login" ? (
              <p onClick={() => showTypeModal("signup")}>
                Don’t have an account? Sign up here.
              </p>
            ) : (
              <p onClick={() => showTypeModal("login")}>
                Already have an account? Sign in here.
              </p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
