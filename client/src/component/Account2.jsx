import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Account({ show, onHide }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleClose = () => setShow(false);
  const handleFormToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <h1 className="text-center">
          {isSignIn ? "Sign In" : "Create Account"}
        </h1>
        <Modal.Body>
          <div className="auth-form-container">
            <form className="auth-form">
              <input type="text" placeholder="username" />
              <input
                type="text"
                placeholder="email"
                className={isSignIn ? "d-none" : "d-block"}
              />
              <input type="password" placeholder="Password" />

              <button type="submit">
                {isSignIn ? "Sign In" : "Create Account"}
              </button>
            </form>
            <p onClick={handleFormToggle} role="button" className="pt-4">
              {isSignIn ? (
                <>
                  <span>Need an account? </span>
                  <span className="text-decoration-underline pt-4">
                    Create one here
                  </span>
                </>
              ) : (
                <>
                  <span>Already have an account? </span>
                  <span className="text-decoration-underline pt-4">
                    Sign in
                  </span>
                </>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
