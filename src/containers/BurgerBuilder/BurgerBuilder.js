import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Auxilary from '../../hoc/Auxilary/Auxilary'

const Ingredients_price = {
    salad: 10,
    cheese: 20,
    meat: 40,
    bacon: 30
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 50,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(updatedIngredients) {
        const sum = Object.values(updatedIngredients)
            .reduce((sum, el) => {
                return sum + el;
            },0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + Ingredients_price[type];

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const newCount = oldCount - 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - Ingredients_price[type];
        
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert("You Continue!!")
    }

    render (){
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Auxilary>
                <Modal show={this.state.purchasing} closingModal={this.purchaseCancelHandler}>
                    <OrderSummary 
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancel={this.purchaseCancelHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientRemove = {this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler} 
                    disabled={disabledInfo} 
                    purchasable = {this.state.purchasable}
                    purchasing={this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Auxilary>
        );
    }
}

export default BurgerBuilder;