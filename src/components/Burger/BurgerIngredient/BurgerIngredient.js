import React from 'react';

import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type){
        case ('bread-bottopm'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        
        case ('bread-top'):
            ingredient = (<div className={classes.BreadTop}>
                <div className={classes.seeds1}></div>
                <div className={classes.seeds2}></div>
            </div>);
            break;
        
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;

        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;

        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;

        default:
            ingredient = null;
            
    }

};

export default burgerIngredient;