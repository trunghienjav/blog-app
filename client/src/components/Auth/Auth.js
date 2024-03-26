import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Icon } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import useStyles from './styles';
// import icon from './icon';
import jwt_decode from 'jwt-decode';
import { signin, signup } from '../../actions/auth'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (isSignUp) {
            dispatch(signup(formData, history));//"we pass the history object to navigate once something happens 3:46:00"
        }else{
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        // console.log(res);
        const token = res?.credential;
        const result = jwt_decode(token);

        try {
            dispatch({ type: 'AUTH', payload: { result, token } });//dispatch thẳng luôn ko qua thèn file action

            // navigate('/');
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = (err) => {
        console.log(err);
        console.log('Google Sign In was unsuccessful. Try Again Later');
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
        >
            <Paper
                className={classes.paper}
                elevation={3}
            // elevation nghĩa là cho nó nổi lên https://mui.com/material-ui/react-paper/
            >
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                    {/* autoFocus là khi vừa vào nó focus vào input luôn */}
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                            autoFocus
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleShowPassword={handleShowPassword}
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                        />
                        {
                            isSignUp &&
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleShowPassword={handleShowPassword}
                                handleChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                            />
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                // disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        cookiePolicy='single_host_origin'
                    /> */}
                    <div style={{ marginLeft: '70px', marginBottom: '15px' }}>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleError}
                            logo_alignment="center"
                            shape="pill"
                            width={100}
                        />
                    </div>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth