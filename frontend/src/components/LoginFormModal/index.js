import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupFormModal from "../SignupFormPage";

function LoginFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  // const {
  //   showLoginModal,
  //   changeLoginModal,
  //   showSignupModal,
  //   changeSignupModal,
  // } = props;
  return (
    <>
      <button className="nav-button" onClick={() => setShowModal(true)}>
        {/* <button className="nav-button" onClick={() => changeLoginModal()}> */}
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* {showLoginModal && (
        <Modal onClose={() => changeLoginModal()}> */}
          <LoginForm />
          <div id="other-option-container">
            <p>Don’t have an account?</p>
            {/* <SignupFormModal onClick={() => changeLoginModal()} /> */}
            <SignupFormModal />
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
