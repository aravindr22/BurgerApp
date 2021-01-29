import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/action';
import Auxilary from '../../hoc/Auxilary/Auxilary'
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('ingredients.json')
    //         .then(response =>{
    //             this.setState({ingredients: response.data});
    //         })
    //         .catch(error => {
    //             this.setState({ error: true});
    //         });
    // }
    
    updatePurchaseState(updatedIngredients) {
        const sum = Object.values(updatedIngredients)
            .reduce((sum, el) => {
                return sum + el;
            },0);

        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + Ingredients_price[type];

    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = newCount;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <=0){
    //         return;
    //     }
    //     const newCount = oldCount - 1;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - Ingredients_price[type];
        
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = newCount;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {        
        // const queryParams = [];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: "/checkout",
            // search: "?" + queryString
        });
    }

    render (){       

        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null
        
        if(this.props.ings){
            orderSummary = <OrderSummary 
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                ingredients={this.props.ings}
                price={this.props.price}/>            
        }
            
        if (this.state.loading){
            orderSummary = this.state.error ? <p>Ingredients Can't be loaded!!</p> : <Spinner />
        }

        let burger = <Spinner />;

        if(this.props.ings){
            burger = (
            <Auxilary>
                <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientRemove = {this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded} 
                        disabled={disabledInfo} 
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        price = {this.props.price}/>
            </Auxilary>
            ); 
        }

        return (
            <Auxilary>
                <Modal show={this.state.purchasing} closingModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}        
            </Auxilary>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName}),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));