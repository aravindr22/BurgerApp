import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import Auxilary from '../../hoc/Auxilary/Auxilary'
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const Ingredients_price = {
    salad: 10,
    cheese: 20,
    meat: 40,
    bacon: 30
}

class BurgerBuilder extends Component {
    state = {
        // ingredients : {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 50,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({ error: true});
            });
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
        //alert("You Continue!!")
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Aravind',
                address: {
                    street: 'chennai',
                    pincode: '600087',
                    country: 'India'
                },
                email: 'aravind08222@gmail.com'
            },
            deliveryMethod: 'fastet'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            }).catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render (){
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null
        
        if(this.state.ingredients){
            orderSummary = <OrderSummary 
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>            
        }
            
        if (this.state.loading){
            orderSummary = this.state.error ? <p>Ingredients Can't be loaded!!</p> : <Spinner />
        }

        let burger = <Spinner />;

        if(this.state.ingredients){
            burger = (
            <Auxilary>
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

export default withErrorHanlder(BurgerBuilder, axios);