import React from "react";
import { TextField, InputAdornment, Grid, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({ half, name, handleChange, autoFocus, label, handleShowPassword, type, value }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}   >
            <TextField
                name={name}
                type={type}
                fullWidth
                value={value}
                onChange={handleChange}
                variant='standard'
                label={label}
                autoFocus={autoFocus}
                required
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} >
                                {type === 'password' ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input;