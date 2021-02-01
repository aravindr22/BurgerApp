import React, {Component} from 'react';

import {connect} from 'react-redux';
import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component{

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true             
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {}

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }        

        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");
            }).catch(error => {
                this.setState({loading: false});
            });
    }

    inputChangeHandler = (event, inputIdentifier) => {        
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key] && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== '';
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    render() {        
        let formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            />
                    ))}
                    <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
                </form>
        );

        if(this.state.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}


export default connect(mapStateToProps, null)(ContactData);