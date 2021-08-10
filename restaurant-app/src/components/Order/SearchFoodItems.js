import { List, ListItem, ListItemText, Paper, IconButton, InputBase, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { createAPIEndPoint, ENDPOINTS } from '../../api';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
    searchInput: {
        flex: 1,
        margin: theme.spacing(1.5),
    },
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    listRoot: {
        margin: theme.spacing(1),
        maxHeight: '450px',
        overflow: 'auto',
        '& .MuiButtonBase-root': {
            display: 'none',
        },
        '& li:hover':{
            cursor: 'pointer',
            backgroundColor: '#E3E3E3',
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
        },
    }
}))

export default function SearchFoodItems(props) {
    const {values, setValues} = props;
    let orderedFoodItem = values.orderDetails;
    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndPoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data);
            setSearchList(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFoodItem.every(item => item.foodItemId != y.foodItemId)
        })
        setSearchList(x);
    }, [searchKey, orderedFoodItem])

    const addFoodItem = (foodItem) => {
        let x = {
            orderDetailId: 0,
            orderMasterId: values.orderMasterId,
            foodItemId: foodItem.foodItemId,
            foodItemPrice: foodItem.price,
            quantity: 1,
            foodItemName: foodItem.foodItemName
        };
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x] //append or push to existing array
        });
    }

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase 
                    className={classes.searchInput} 
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder='Search food items' 
                />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {searchList.map((item, index) => (
                    <ListItem 
                        key={index}
                        onClick={(e) => addFoodItem(item)}
                    >
                        <ListItemText 
                            primary={item.foodItemName} 
                            secondary={'$' + item.price}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={(e) => addFoodItem(item)} >
                                <PlusOneIcon />
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
                
            </List>
        </>
    )
}
