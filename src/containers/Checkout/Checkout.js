import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // UNSAFE_componentWillMount (){
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     var price = 0;
    //     for(let params of query.entries()){
    //         if(params[0] === 'price'){
    //             price = params[1]
    //         } else {
    //             ingredients[params[0]] = +params[1]             //A plus in a front converts string to integer
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {

        let summary = <Redirect to="/" />
        
        if(this.props.igns){

            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.igns}/>

                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}
                    // render={(props) => (<ContactData 
                    //                     ingredients={this.props.igns}
                    //                     totalPrice={this.props.price} 
                    //                     {...props} />)} 
                    />
            </div>
            )
        }

        return(
            <div>
                {summary}
            </div>
        );
    };

}

const mapStateToProps = state => {
    return{
        igns: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(Checkout);