import { useContext, useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar, Paper } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

export default function Authentication() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [formState, setFormState] = useState(0);
    const [open, setOpen] = useState(false);
    const { handleRegister, handleLogin } = useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            setError(err.response?.data?.message || "An Error occured");
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" textAlign="center" mb={3}>
                    {formState === 1 ? "Create an Account" : "Welcome Back"}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button 
                        fullWidth 
                        variant={formState === 0 ? "contained" : "outlined"} 
                        onClick={() => { setFormState(0); setError(""); }}
                    >
                        Sign In
                    </Button>
                    <Button 
                        fullWidth 
                        variant={formState === 1 ? "contained" : "outlined"} 
                        onClick={() => { setFormState(1); setError(""); }}
                    >
                        Sign Up
                    </Button>
                </Box>

                <Box component="form" noValidate>
                    {formState === 1 && (
                        <TextField margin="normal" required fullWidth label="Full Name" value={name} autoFocus onChange={(e) => setName(e.target.value)} />
                    )}
                    
                    <TextField margin="normal" required fullWidth label="Username" value={username} autoFocus={formState === 0} onChange={(e) => setUsername(e.target.value)} />
                    
                    <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1, minHeight: 20 }}>
                            {error}
                        </Typography>
                    )}

                    <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleAuth}>
                        {formState === 1 ? "Register" : "Login"}
                    </Button>
                </Box>
            </Paper>

            <Snackbar 
                open={open} 
                autoHideDuration={4000} 
                onClose={() => setOpen(false)} 
                message={message} 
            />
        </Box>
    );
}