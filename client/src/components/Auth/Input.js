import React from 'react'
import { IconButton, InputAdornment, TextField, Grid } from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//đây là các input được custome cho phần auth
const Input = ({ name, handleChange, label, autoFocus, type, half, handleShowPassword, error, helperText }) => {

    return (
        <Grid
            item xs={12}
            sm={half ? 6 : 12}
        >
            <TextField
                name={name}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                error={error}
                helperText={helperText}
                InputProps={name === 'password' ? { //InputProps này là cái nút mắt ở mật khẩu
                    endAdornment: (
                        <InputAdornment position='end' >
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    );
}

export default Input