import { useState } from "react";
import "./style.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalMessageContext } from "../../components/GlobalMessageContext";

const Register = () => {
  const { setGlobalMessage, setGlobalMessageType } = useGlobalMessageContext();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // navigate route
  const navigate = useNavigate();

  // Toggle between sign-up and sign-in panels
  const togglePanel = () => {
    setIsRightPanelActive((prev) => !prev);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sign-up handler
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", formData, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      // Handle the response
    console.log(formData);
    if (response.status == 200) {
      setGlobalMessage(response.data.message); // Use response.data for the message
      setGlobalMessageType("success");
      togglePanel();
    }
  } catch (err) {
    console.error(err);
    const e = err?.response?.data?.error;
    setGlobalMessage(e || "An error occurred. Please try again.");
    setGlobalMessageType("error");
  }

  // Clear the message after 3 seconds
  setTimeout(() => setGlobalMessage(""), 3000);
};

  // Sign-in handler
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setGlobalMessage(response.data.message);
        setGlobalMessageType("success");
        navigate('/');
      } 
    } catch (err) {
      const e = err?.response?.data?.error;
      setGlobalMessage( e ||" An error occurred. Please try again.");
      console.error(err);
      setGlobalMessageType("error");
    }
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" style={{ marginTop: "20px" }}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" style={{ marginTop: "20px" }}>
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={togglePanel}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={togglePanel}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
