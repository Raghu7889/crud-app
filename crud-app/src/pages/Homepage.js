import React from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-background">
      <Container className="home-container">
        <Typography
          variant="h3"
          gutterBottom
          className="home-title"
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", color: "#007bff" }} // Add cursor and color to indicate it's clickable
        >
          Welcome to the Crud App ꕥ
        </Typography>
      </Container>
    </div>
  );
};

export default HomePage;
