import React, { useState } from "react";
import api from "../../api/axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
 
function Login() {
  const [apiError,setApiError]=useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);
 const navigate = useNavigate();

  const validate=()=>{
    let temperror={};
    if(!username.trim()){
      temperror.username="Username is required";
    }

    if(!password.trim()){
      temperror.password="Password is required";
    }
    setErrors(temperror);
    return Object.keys(temperror).length===0;
  };

   const handlelogin=async()=>{
    setApiError("");
    if(!validate()) return;

    try{
      setLoading(true);
      const response=await api.post("/auth/login",{username,password}
        
      );
      const token=response.data.token;
      const decoded=jwtDecode(token);
      const expiryTime=decoded.exp*1000;
    localStorage.setItem("token", response.data.token);
localStorage.setItem("tokenExpiry",expiryTime);
      
      navigate("/dashboard");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000066, #3f51b5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 350, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            TechRentals
          </Typography>

          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Sign in to your account
          </Typography>
        {/*Api error */}
        {
          apiError && (
             <Typography color="error" align="center">
              {apiError}
            </Typography>
          )
        }
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handlelogin}
            disabled={loading}
          >
           {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;