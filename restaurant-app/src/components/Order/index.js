import React from 'react';
import OrderForm from './OrderForm';
import useForm from '../../hooks/useForm';
import { Grid } from '@material-ui/core';
import OrderedFoodItems from './OrderedFoodItems';
import SearchFoodItems from './SearchFoodItems';

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    orderMasterId : 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds: '',
    orderDetails: []
})

export default function Order() {
    const  {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

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
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm 
                    { ...{values, errors, handleInputChange}}
                />
            </Grid>
            <Grid item xs={6}>
                <SearchFoodItems 
                    {...{addFoodItem}}
                />
            </Grid>
            <Grid item xs={6}>
                <OrderedFoodItems 
                    {...{orderedFoodItem: values.orderDetails}}
                />
            </Grid>
        </Grid>
    )
}
