import React from 'react';

import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price} Rs</strong></p>
            {controls.map(ele =>(
                <BuildControl 
                    key={ele.label} 
                    label={ele.label}
                    remove={() => props.ingredientRemove(ele.type)} 
                    added={() => props.ingredientAdded(ele.type)} 
                    disabled = {props.disabled[ele.type]} />
            ))}
            <button 
                disabled={!props.purchasable}
                onClick={props.purchasing} 
                className={classes.OrderButton}>ORDER NOW!!</button>
        </div>
    );
};

export default buildControls;