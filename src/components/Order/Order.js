import React from 'react';

import classes from './Order.css';

const Order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: MEat(1)</p>
        <p>Price: <strong>INR 150</strong></p>
    </div>
);

export default Order;