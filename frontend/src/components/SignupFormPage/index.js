import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="nav-button" onClick={() => setShowModal(true)}>
        Sign up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
          <div id="other-option-container">
            <p>Already have an account?</p>
            <LoginFormModal />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
