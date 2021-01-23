import React, {Component} from 'react';

import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                //console.log(fetchedOrders)
                this.setState({loading: false, orders: fetchedOrders});
            }).catch(err =>{
                console.log(err)
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
                    ))
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);