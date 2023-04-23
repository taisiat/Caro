import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupFormModal from "../SignupFormPage";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="nav-button" onClick={() => setShowModal(true)}>
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          <div id="other-option-container">
            <p>Don’t have an account?</p>
            <SignupFormModal />
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
