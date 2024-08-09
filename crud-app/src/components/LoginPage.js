import React, { useState } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ username, password });
      localStorage.setItem("token", token);
      setError(""); // Clear any previous error message
      setSuccess("Login successful!"); // Show success message

      setTimeout(() => {
        navigate("/users");
      }, 2000); // Navigate after 2 seconds
    } catch (err) {
      setError("Invalid credentials");
      setUsername(""); // Clear username field
      setPassword(""); // Clear password field
      setTimeout(() => {
        setError(""); // Clear error message after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="login-background">
      <center>
        <Container className="login-container">
          <div className="login-card">
            <Typography variant="h4" className="title">
              Login
            </Typography>
            <form onSubmit={handleSubmit} className="login-form">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{ className: "input-field" }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ className: "input-field" }}
              />
              {error && (
                <Typography color="error" className="error-message">
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="primary" className="success-message">
                  {success}
                </Typography>
              )}
              <div className="button-container">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="login-button"
                >
                  Login
                </Button>
              </div>
              <div className="space">
                <Typography variant="body2" className="register-link">
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => navigate("/register")}
                    className="link"
                  >
                    Register
                  </Link>
                </Typography>
              </div>
            </form>
          </div>
        </Container>
      </center>
    </div>
  );
};

export default LoginPage;
