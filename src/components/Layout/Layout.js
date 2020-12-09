import React from 'react';

import Auxilary from '../../hoc/Auxilary';

import classes from './Layout.css'

const layout = (props) => (
    <Auxilary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>    
);

export default layout