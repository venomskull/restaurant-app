import React from 'react';
import { List, ListItem, ListItemText, Paper, IconButton, InputBase, makeStyles, ListItemSecondaryAction } from '@material-ui/core';

export default function OrderedFoodItems(props) {
    const {orderedFoodItem} = props;

    return (
        <List>
            {orderedFoodItem.map((item, index) => (
                <Paper>
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
                        />
                    </ListItem>
                </Paper>
            ))}
        </List>
    )
}
