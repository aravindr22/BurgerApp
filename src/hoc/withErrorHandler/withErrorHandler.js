import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary';

const withErrorHanlder = ( WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        
        componentWillMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            
            axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }

        render(){
            return (
                <Auxilary>
                    <Modal 
                        show={this.state.error} 
                        closingModal={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            );
        }
    }
}

export default withErrorHanlder;