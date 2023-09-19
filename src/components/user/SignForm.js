import React, { useState, useContext } from "react";
import "./register.css";
import { loadPopup, loadSuccessPopup } from "../../service/ToastifyPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const SignForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


 

  const handleSignIn = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (email === "") {
      loadPopup("Please enter Email");
      isValid = false;
    }

    if (password === "") {
      loadPopup("Please enter Password");
      isValid = false;
    }
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/authenticate",
          { email, password }
        );
        console.log("Sign-in response:", response.data);
        const jwtCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('jwtToken='));

// Extract the token value from the cookie
const jwtToken = jwtCookie ? jwtCookie.split('=')[1] : null;

console.log('JWT Token:', jwtToken);
        loadSuccessPopup("Sign-in successful");
        sessionStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      } catch (error) {
        console.error("Sign-in error:", error);
        loadPopup("Error signing in");
      }
      setEmail("");
      setPassword("");
    }
  };

  // const signupFormHandler = () => {
  //   props.onClick();
  // };

  return (
    <div className="App">
        <h1>Sign In Form</h1>
      <div className="form-container">
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //   required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   required
            />
          </div>
          <div className="flexbtn">
            <button type="submit">Sign In</button>
            not a member?
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignForm;
