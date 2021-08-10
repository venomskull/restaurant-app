import React from 'react';
import { List, ListItem, ListItemText, Paper, IconButton, ButtonGroup, InputBase, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { Button, Select, Input } from '../../controls';
import { roundTo2DecimalPoint } from '../../utils';

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer',
        },
        '&:hover $deleteButton': {
            display: 'block',
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719',
        }
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2rem',
        margin: '0px 10px',
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root': {
            border: 'none',
            minWidth: '25px',
            padding: '1px',
        },
        '& button:nth-child(2)': {
            fontSize: '1.2rem',
            color: '#000',
        }
    }
}))

export default function OrderedFoodItems(props) {
    const {values, setValues} = props;
    const classes = useStyles();
    let orderedFoodItem = values.orderDetails;

    const removeFoodItem = (index, item) => {
        let x = {...values};
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        setValues({...x});
    }

    const updateQuantity = (index, value) => {
        let x = {...values};
        if (x.orderDetails[index].quantity + value > 0) {
            x.orderDetails[index].quantity += value;
            setValues({...x});
        }
        
    }

    return (
        <List>
            {orderedFoodItem.map((item, index) => (
                <Paper className={classes.paperRoot}>
                    <ListItem>
                        <ListItemText 
                            primary={item.foodItemName}
                            primaryTypographyProps={{
                                component: 'h1',
                                style: {
                                    fontSize: '1.2rem',
                                    fontWeight: '500'
                                }
                            }}
                            secondary={
                                <>
                                    <ButtonGroup
                                        className={classes.buttonGroup}
                                        size='small'
                                    >
                                        <Button onClick={(e) => updateQuantity(index, -1)} >-</Button>
                                        <Button>{item.quantity}</Button>
                                        <Button onClick={(e) => updateQuantity(index, 1)} >+</Button>
                                    </ButtonGroup>
                                    <span className={classes.totalPerItem}>{'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}</span>
                                </>
                            }
                        />
                        <ListItemSecondaryAction
                            className={classes.deleteButton}
                        >
                            <IconButton 
                                disableRipple 
                                onClick={(e) => removeFoodItem(index, item.orderDetailId)}
                            >
                                <DeleteTwoToneIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Paper>
            ))}
        </List>
    )
}
