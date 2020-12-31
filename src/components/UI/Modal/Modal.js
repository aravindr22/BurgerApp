import React, {Component} from 'react';

import classes from './modal.css';

import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Backdrop1 from '../Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
            return true;
        }
        return false;
    }
    
    render(){

        return(

            <Auxilary>
                <Backdrop1 show={this.props.show} clicked={this.props.closingModal}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxilary>
        );
    }
}
    
export default Modal;