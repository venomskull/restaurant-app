import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import React, {useState} from 'react';
import Form from '../../layouts/Form';
import { Button, Select, Input } from '../../controls';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReplayIcon from '@material-ui/icons/Replay';
import ReorderIcon from '@material-ui/icons/Reorder';

const pMethod = [
    {id: 'none', title: 'Select'},
    {id: 'Cash', title: 'Cash'},
    {id: 'Card', title: 'Card'},
]

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontSize: '1.5em',
            fontWeight: 'bolder'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        margin: theme.spacing(1),
        color: '#000',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {
    const {values, errors, handleInputChange} = props;
    const classes = useStyles();

    return (
       <Form>
           <Grid container>
               <Grid item xs={6}>
                   <Input 
                        disabled
                        label='Order Number'
                        name='orderNumber'
                        value={values.orderNumber}
                        InputProps={{
                            startAdornment: <InputAdornment className={classes.adornmentText} position="start">#</InputAdornment>
                        }}
                   />
               </Grid>
               <Grid item xs={6}>
                    <Select 
                        label='Payment Method'
                        name='pMethod'
                        options={pMethod}
                        onChange={handleInputChange}
                        value={values.pMethod}
                   />
               </Grid>
           </Grid>
           <Grid container>
               <Grid item xs={6}>
                    <Select 
                        label='Customer'
                        name='customerId'
                        onChange={handleInputChange}
                        options={[
                            {id: 0, title: 'Select'},
                            {id: 1, title: 'Customer 1'},
                            {id: 2, title: 'Customer 2'},
                            {id: 3, title: 'Customer 3'},
                            {id: 4, title: 'Customer 4'},
                        ]}
                        value={values.customerId}
                   />
               </Grid>
               <Grid item xs={6}>
                    <Input 
                       disabled
                       label='Grand Total'
                       name='gTotal' 
                       value={values.gTotal}
                       InputProps={{
                           startAdornment: <InputAdornment className={classes.adornmentText} position="start">$</InputAdornment>
                       }}
                   />
                   <ButtonGroup className={classes.submitButtonGroup}>
                       <MuiButton
                            size="large"
                            type="submit"
                            endIcon={<RestaurantMenuIcon/>}
                       >Submit</MuiButton>
                       <MuiButton 
                            size="small"
                            startIcon={<ReplayIcon/>}
                       />
                   </ButtonGroup>
                   <Button
                        size="large"
                        startIcon={<ReorderIcon/>}
                   >Orders</Button>
               </Grid>
           </Grid>
       </Form>
    )
}
