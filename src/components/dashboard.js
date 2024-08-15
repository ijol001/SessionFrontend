import { Button, CssBaseline, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../services/authApi';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/'); 
    };

    return (
        <>
            <CssBaseline />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
                sx={{
                    backgroundColor: 'peru',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    padding: 2,
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    sx={{
                        position: 'relative',
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '2px solid rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                        borderRadius: 8,
                        backdropFilter: 'blur(20px)',
                        boxShadow: 3,
                        textAlign: 'center',
                    }}
                >
                    <h3>You are successfully logged in!</h3>
                    <Button variant='contained' onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
