import React from 'react';

import classes from './modal.css';

import Auxilary from '../../../hoc/Auxilary';
import Backdrop1 from '../Backdrop/Backdrop';

const modal = (props) => (
    
    <Auxilary>
        <Backdrop1 show={props.show} clicked={props.closingModal}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxilary>
);

export default modal;