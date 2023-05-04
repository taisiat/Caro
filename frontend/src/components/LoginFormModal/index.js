import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
// import SignupFormModal from "../SignupFormPage";
import SignupForm from "../SignupFormPage/SignupForm";

function LoginFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  // const {
  //   showLoginModal,
  //   changeLoginModal,
  //   showSignupModal,
  //   changeSignupModal,
  // } = props;
  const [modalType, setModalType] = useState("login");
  const toggle = () => {
    if (modalType === "signup") {
      // return <SignupForm />;
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
      {/* <button className="nav-button" onClick={() => setShowModal(true)}> */}
      <button className="nav-button" onClick={() => showTypeModal("login")}>
        {/* <button className="nav-button" onClick={() => changeLoginModal()}> */}
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* {showLoginModal && (
        <Modal onClose={() => changeLoginModal()}> */}
          {/* <LoginForm /> */}
          {toggle()}
          <div id="other-option-container">
            {/* <p onClick={() => showTypeModal("signup")}>
              Don’t have an account? Sign up here.
            </p> */}
            {modalType === "login" ? (
              <p onClick={() => showTypeModal("signup")}>
                Don’t have an account? Sign up here.
              </p>
            ) : (
              <p onClick={() => showTypeModal("login")}>
                Already have an account? Sign in here.
              </p>
            )}
            {/* <SignupFormModal onClick={() => changeLoginModal()} /> */}
            {/* <SignupFormModal /> */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
