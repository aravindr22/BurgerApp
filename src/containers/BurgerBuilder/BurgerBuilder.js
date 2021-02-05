import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as action from '../../store/actions/index';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }
    
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
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
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
        this.props.onInitPurchase();
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

        let burger = this.props.error ? <p>Ingredients Can't be loaded!!</p> : <div style={{marginTop: '150px'}}><Spinner /></div>

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
                        isAuth={this.props.isAuthenticated}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (igName) => dispatch(action.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(action.removeIngredient(igName)),
        onInitIngredients: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));