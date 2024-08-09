import React, { useState } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser({ username, password });
      setError("");
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("User already exists");
      } else {
        setError("Registration failed");
      }
      setSuccess("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="register-background">
      <center>
        <Container className="register-container">
          <div className="register-card">
            <Typography variant="h4" className="title">
              Register
            </Typography>
            {success && (
              <Typography color="success" className="success-message">
                {success}
              </Typography>
            )}
            <form onSubmit={handleSubmit} className="register-form">
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{ className: "input-field" }}
              />
              {error && (
                <Typography color="error" className="error-message">
                  {error}
                </Typography>
              )}
              <div className="button-container">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="register-button"
                >
                  Register
                </Button>
              </div>
              <div className="space">
                <Typography variant="body2" className="login-link">
                  Already have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => navigate("/login")}
                    className="link"
                  >
                    Login
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

export default RegisterPage;
