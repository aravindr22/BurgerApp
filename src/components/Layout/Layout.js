import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Auxilary from '../../hoc/Auxilary';

import classes from './Layout.css'

const layout = (props) => (
    <Auxilary>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>    
);

export default layout