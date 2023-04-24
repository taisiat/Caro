import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  // const {
  //   showLoginModal,
  //   changeLoginModal,
  //   setShowLoginModal,
  //   showSignupModal,
  //   changeSignupModal,
  //   setShowSignupModal,
  //   toggleForms,
  // } = props;

  return (
    <>
      <button className="nav-button" onClick={() => setShowModal(true)}>
        {/* <button className="nav-button" onClick={() => setShowSignupModal(true)}> */}
        Sign up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}> */}
          <SignupForm />
          <div id="other-option-container">
            <p>Already have an account?</p>
            {/* <LoginFormModal onClick={() => toggleForms()} /> */}
            <LoginFormModal />
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
