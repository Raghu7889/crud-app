import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../services/userService";

const EditUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        setUsername(user.username);
      } catch (err) {
        setError("Failed to fetch user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { username, password });
      navigate("/users");
    } catch (err) {
      setError("Failed to update user");
    }
  };

  return (
    <Container className="edit-user-container">
      <Typography variant="h4">Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditUser;
