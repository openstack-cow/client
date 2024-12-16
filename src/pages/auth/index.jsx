import { useState } from "react";
import styles from "./style.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalMessageContext } from "../../components/GlobalMessageContext";
import { BACKEND_URL } from "../../env";

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
      const response = await axios.post(`${BACKEND_URL}/signup`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
      });
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
};

  // Sign-in handler
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setGlobalMessage(response.data.message);
        localStorage.setItem("token", response.token); // Lưu token vào localStorage
        setGlobalMessageType("success");
        navigate('/');
      } 
    } catch (err) {
      const e = err?.response?.data?.error;
      setGlobalMessage( e ||" An error occurred. Please try again.");
      console.error(err);
      setGlobalMessageType("error");
    }
  };

  return (
    <div className={styles.body}>
    <div
      className={`${styles.container} ${isRightPanelActive ? styles["right-panel-active"] : ""}`}
      id="container"
    >
      <div className={`${styles["form-container"]} ${styles["sign-up-container"]}`}>
        <form className={styles.form} onSubmit={handleSignUpSubmit}>
          <h1 className={styles.h1}>Create Account</h1>
          <div className={styles["social-container"]}>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span className={styles.span}>or use your email for registration</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.button} type="submit" style={{ marginTop: "20px" }}>
            Sign Up
          </button>
        </form>
      </div>
      <div className={`${styles["form-container"]} ${styles["sign-in-container"]}`}>
        <form onSubmit={handleSignInSubmit} className={styles.form}>
          <h1 className={styles.h1}>Sign in</h1>
          <div className={styles["social-container"]}>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={styles.a + " " + styles.social}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span className={styles.span}>or use your account</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" style={{ marginTop: "20px" }} className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
      <div className={styles["overlay-container"]}>
        <div className={styles.overlay}>
          <div className={styles["overlay-panel"]+ " " + styles["overlay-left"]}>
            <h1 className={styles.h1}>Welcome Back!</h1>
            <p className={styles.p}>To keep connected with us please login with your personal info</p>
            <button className={`${styles.button} ${styles.ghost}`} id="signIn" onClick={togglePanel}>
              Sign In
            </button>
          </div>
          <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
            <h1 className={styles.h1}>Hello, Friend!</h1>
            <p className={styles.p}>Enter your personal details and start your journey with us</p>
            <button className={`${styles.button} ${styles.ghost}`} id="signUp" onClick={togglePanel}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
