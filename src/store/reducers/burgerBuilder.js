import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 50,
    erorr: false
};

const Ingredients_price = {
    salad: 10,
    cheese: 20,
    meat: 40,
    bacon: 30
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + Ingredients_price[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - Ingredients_price[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
};

export default reducer;