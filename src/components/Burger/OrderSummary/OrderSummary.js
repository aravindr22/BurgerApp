import React from 'react';

import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>: {props.ingredients[igKey]}
            </li> )
        });
    
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price} Rs</strong></p>
            <p>Continue Checkout!!</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Auxilary>
    );
};

export default orderSummary;