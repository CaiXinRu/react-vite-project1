import { useState } from "react";
import { Menu, Form, Message } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";

function LogIn() {
  const { logIn } = useAuth();
  const [activeItem, setActiveItem] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailErrors("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErrors("Email is invalid.");
    } else {
      setEmailErrors("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordErrors("Password is required.");
    } else if (password.length < 5) {
      setPasswordErrors("Password must be at least 6 characters.");
    } else {
      setPasswordErrors("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();
    if (!emailErrors && !passwordErrors) {
      logIn(email, password, activeItem === "signup");
    }
  };

  return (
    <>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "signup"}
          onClick={() => setActiveItem("signup")}
        >
          Sign Up
        </Menu.Item>
        <Menu.Item
          active={activeItem === "signin"}
          onClick={() => setActiveItem("signin")}
        >
          Sign In
        </Menu.Item>
      </Menu>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Email"
          value={email}
          onBlur={validateEmail}
          onChange={handleEmailChange}
          placeholder="Email address"
        />
        {emailErrors && <Message negative>{emailErrors}</Message>}
        <Form.Input
          label="Password"
          value={password}
          onBlur={validatePassword}
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
        />
        {passwordErrors && <Message negative>{passwordErrors}</Message>}
        <Form.Button>
          {activeItem === "signup" && "Sign Up"}
          {activeItem === "signin" && "Sign In"}
        </Form.Button>
      </Form>
    </>
  );
}

export default LogIn;
