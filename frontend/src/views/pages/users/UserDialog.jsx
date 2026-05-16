import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Switch,
  FormControlLabel
} from "@mui/material";

function UserDialog({ open, handleClose, user, onSuccess ,showMessage}) {
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
  username: "",
  email: "",
  pword: "",
  roleId: "",
  realName: "",
  signature: "",
  position: "",
  department: "",
  inactive: false
});

  useEffect(() => {
    loadRoles();
    if (user) {
      setForm({
      username: user.username || "",
      email: user.email || "",
      roleId: user.roleId || "",
      realName: user.realName || "",
      signature: user.signature || "",
      position: user.position || "",
      department: user.department || "",
      inactive: user.inactive || false,
      pword: ""
    });
    } else {
      setForm({ userName: "", email: "", password: "" });
    }
  }, [user]);
const loadRoles = async () => {
  const res = await api.get("/roles");
  setRoles(res.data);
};
const validate = () => {
  let temp = {};

  // Username
  if (!form.username.trim()) {
    temp.username = "Username is required";
  }

  // Email
  if (!form.email.trim()) {
    temp.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    temp.email = "Invalid email format";
  }

  // Role
  if (!form.roleId) {
    temp.roleId = "Role is required";
  }

  // Password (ONLY on create)
  if (!user) {
    if (!form.pword.trim()) {
      temp.pword = "Password is required";
    } else if (form.pword.length < 6) {
      temp.pword = "Password must be at least 6 characters";
    }
  }

  setErrors(temp);

  return Object.keys(temp).length === 0;
};
  const handleSubmit = async () => {
    if (!validate()) return;

  try {
    if (user) {
      await api.put("/users", {
        id: user.id,
        ...form
      });
      showMessage("User updated successfully");
    } else {
      await api.post("/users", form);
      showMessage("User created successfully");
    }

    onSuccess();
    handleClose();

  } catch (error) {
    showMessage(
      error.response?.data?.message || "Something went wrong",
      "error"
    );
  }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>

      <DialogContent>
        <TextField label="Username" fullWidth margin="normal"
  value={form.username}
  //onChange={(e) => setForm({...form, username: e.target.value})
  value={form.username}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, username: e.target.value }))
  }
  error={!!errors.username}
  helperText={errors.username}
/>

<TextField label="Email" fullWidth margin="normal"
  value={form.email}
  value={form.email}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, email: e.target.value }))
  }
  error={!!errors.email}
  helperText={errors.email}
/>

<TextField select label="Role" fullWidth margin="normal"
  value={form.roleId}
   onChange={(e) =>
    setForm((prev) => ({ ...prev, roleId: e.target.value }))
  }
  error={!!errors.roleId}
  helperText={errors.roleId}
>
  {roles.map(r => (
    <MenuItem key={r.id} value={r.id}>
      {r.description}
    </MenuItem>
  ))}
</TextField>

<TextField label="Real Name" fullWidth margin="normal"
  value={form.realName}
  onChange={(e) => setForm({...form, realName: e.target.value})}
/>

<TextField label="Position" fullWidth margin="normal"
  value={form.position}
  onChange={(e) => setForm({...form, position: e.target.value})}
/>

<TextField label="Department" fullWidth margin="normal"
  value={form.department}
  onChange={(e) => setForm({...form, department: e.target.value})}
/>
<TextField label="Signature" fullWidth margin="normal"
  value={form.signature}
  onChange={(e) => setForm({...form, signature: e.target.value})}
/>

{!user && (
  <TextField type="password" label="Password" fullWidth margin="normal"
    value={form.pword}
     onChange={(e) =>
      setForm((prev) => ({ ...prev, pword: e.target.value }))
    }
    error={!!errors.pword}
    helperText={errors.pword}
  />
)}

<FormControlLabel
  control={
    <Switch
      checked={form.inactive}
      onChange={(e) => setForm({...form, inactive: e.target.checked})}
    />
  }
  label="Inactive"
/>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;