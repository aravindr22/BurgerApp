import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.sideDrawerOpenHandler} />
        {/* ONe way of doing it the othrt way is done below */}
        {/* <Logo height="80%"/> */}
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolBar;