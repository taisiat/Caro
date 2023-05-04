import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import LoginForm from "../LoginFormModal/LoginForm";

function SignupFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("signup");
  const toggle = () => {
    if (modalType === "signup") {
      return <SignupForm />;
    } else if (modalType === "login") {
      return (
        <LoginForm
          onSignup={() => {
            setModalType("login");
          }}
        />
      );
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
      <button className="nav-button" onClick={() => showTypeModal("signup")}>
        Sign up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {toggle()}
          <div id="other-option-container">
            {modalType === "signup" ? (
              <p onClick={() => showTypeModal("login")}>
                Already have an account? Sign in here.
              </p>
            ) : (
              <p onClick={() => showTypeModal("signup")}>
                Don’t have an account? Sign up here.
              </p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
