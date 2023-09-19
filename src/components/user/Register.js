import React, { useState, useEffect } from "react";
import "./register.css";
import { loadPopup, loadSuccessPopup } from "../../service/ToastifyPopup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const initialValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "",
};
const Register = (props) => {
  const [formData, setFormData] = useState(initialValue);
  const [emailExists, setEmailExists] = useState(false);
    const navigate= useNavigate();
  useEffect(() => {
    const identifier = setTimeout(async () => {
      console.log("checking form validity");
      try {
        const email = formData.email;
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/validate-email",
          { email }
        );
        if (response.data === true) {
          setEmailExists(true);
          loadPopup("email already Exists");
        } else {
          setEmailExists(false);
        }
      } catch (error) {
        console.error("Email validation error:", error);
      }
    }, 2000);

    //de-bouncing
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [formData.email]);

  console.log("Register");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signFormHandler = () => {
    props.onClick();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (formData.firstname === "") {
      loadPopup("Please enter First Name");
      isValid = false;
    }

    if (emailExists === true) {
      loadPopup("Email already exists..");
      isValid = false;
    }

    if (formData.lastname === "") {
      loadPopup("Please enter Last Name");
      isValid = false;
    }

    if (formData.email === "") {
      loadPopup("Please enter Email");
      isValid = false;
    }

    if (formData.password === "") {
      loadPopup("Please enter Password");
      isValid = false;
    }

    if (formData.role === "") {
      loadPopup("Please select Role");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          formData
        ); // Adjust the URL to your backend endpoint
        console.log("Registration response:", response.data);
        loadSuccessPopup("🦄 Registration successful");
        navigate("/#contact");
      } catch (error) {
        console.error("Registration error:", error);
        loadPopup("Error registering");
      }
      setFormData(initialValue);
    }
  };

  return (
    <div className="App">
      <h1>Register Form</h1>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            // required
          />
          {emailExists && <p> Email already exists ......</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            // required
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="flexbtn">
        <button type="submit" >Register</button>
          <Link to="/" style={{ textDecoration: "none" }}>
            Sign in
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
