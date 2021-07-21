import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        '& MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        }
    }
}))

export default function Form(props) {
    const classes = useStyles();
    const {children, ...other} = props;

    return (
        <form noValidate autoComplete='off' className={classes.root} {...other} >
            {children}
        </form>
    )
}
