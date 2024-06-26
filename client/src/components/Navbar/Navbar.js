import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { LOGOUT } from '../../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory(); //we can re-navigate to certain pages
    const location = useLocation(); //we know on which page are we currently,
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
        history.push('/auth');
        console.log("Chạy logout");
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }//nếu qua 1 tiếng, thì yc login lại

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar
            className={classes.appBar}
            position="static"
            color="inherit"
        >
            <Link to="/" className={classes.brandContainer}>
                <img
                    src={memoriesText}
                    alt='icon'
                    height='45px'
                />
                <img
                    className={classes.image}
                    src={memoriesLogo}
                    alt="memories"
                    height="60"
                />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.picture}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography
                            className={classes.userName}
                            variant='h6'
                        >
                            {user.result.name}
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.logout}
                            color='secondary'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant='contained'
                        color="primary"
                    >
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar