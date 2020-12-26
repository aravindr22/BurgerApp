import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilary from '../../../hoc/Auxilary';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <Auxilary>
            <Backdrop show={props.show} clicked={props.sideDrawerCloseHandler}/>
            <div className={attachedClasses.join(' ')}>
                {/* ONe way of doing it the othrt way is done below */}
                {/* <Logo height="11%"/> */}
                <div className={classes.Logo}>
                    <Logo />
                </div>            
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilary>
    );
};

export default sideDrawer;