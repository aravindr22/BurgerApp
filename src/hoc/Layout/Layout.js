 import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Auxilary from '../Auxilary/Auxilary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css'

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosingHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {

        //This type of set state update is used when we use the current state for update
        //(i.e) this.setState({showSideDrawer: !this.state.showSideDrawer })
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <Auxilary>
                <Toolbar sideDrawerOpenHandler={this.sideDrawerOpenHandler}/>
                <SideDrawer show={this.state.showSideDrawer} sideDrawerCloseHandler={this.sideDrawerClosingHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>    
        );
    }
}

export default Layout;