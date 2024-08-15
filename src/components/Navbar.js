import React, {useState} from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'



const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
   
    return (
        <Box sx={{ flexGrow: 3 }}>
            <AppBar position='static' sx={{ color: 'white', backgroundColor: 'navy' }}>
                <Toolbar>
                    <Typography fontSize='22px' fontFamily='forte' component="div" sx={{ flexGrow: 2 }}>
                        Session-Auth
                    </Typography>

                    {loggedIn ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? 'white' : '', color: isActive ? 'black' : '' } }} sx={{ color: 'white', fontFamily: 'serif', fontSize: '20px', textTransform: 'none' }}>Dashboard</Button> :
                        <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? 'white' : '', color: isActive ? 'black' : '' } }} sx={{ color: 'white', fontFamily: 'serif', fontSize: '20px', textTransform: 'none' }}>Sign-in </Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
