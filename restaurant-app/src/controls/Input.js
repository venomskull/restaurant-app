import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
    const {name, label, value, variant, error = null, onChange, ...other} = props;

    return (
        <TextField 
            name={name}
            label={label}
            variant={variant || 'outlined'}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,  helperText: error})}
        />
    )
}
