import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getUsers, deleteUser, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for success messages
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState(""); // Added for password update
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 2000); // Clear success message after 2 seconds
    } catch (err) {
      setError("Failed to delete user");
      setTimeout(() => setError(""), 2000); // Clear error message after 2 seconds
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setUpdatedUsername(user.username);
    setUpdatedPassword(""); // Clear the password field
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (editUser) {
      try {
        const updatedUser = {
          username: updatedUsername,
          ...(updatedPassword && { password: updatedPassword }), // Include password only if it's provided
        };
        await updateUser(editUser._id, updatedUser);
        setUsers(
          users.map((user) =>
            user._id === editUser._id
              ? { ...user, username: updatedUsername }
              : user
          )
        );
        setOpen(false);
        setSuccess("User updated successfully!");
        setTimeout(() => setSuccess(""), 2000); // Clear success message after 2 seconds
      } catch (err) {
        setError("Failed to update user");
        setTimeout(() => setError(""), 2000); // Clear error message after 2 seconds
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #84fab0, #8fd3f4)",
        minHeight: "100vh",
      }}
    >
      <Container>
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              User Management
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{
              marginBottom: "20px",
            }}
          >
            User List
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <TableContainer
            component={Paper}
            style={{
              width: "80%",
              minWidth: "800px",
              padding: "10px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(user)}
                        style={{ marginRight: "15px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
              helperText="Leave empty if not changing"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default UserList;
