import React from 'react';

import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];

    for(let ingredient in props.ingredients){
        // console.log(ingredients,props.ingredients[ingredients])
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }
    
    const ingredientOutput = ingredients.map(ig => {
        return <span style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }} 
                    key={ig.name}>
                    {ig.name}: ({ig.amount})  
                </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>INR {props.price}</strong></p>
        </div>
    );
};

export default Order;