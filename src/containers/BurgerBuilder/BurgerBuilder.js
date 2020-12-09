import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';

import Auxilary from '../../hoc/Auxilary'

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        }
    }

    render (){
        return (
            <Auxilary>
                <Burger ingredients={this.state.ingredients} />
                <div>Build COntrol</div>
            </Auxilary>
        );
    }
}

export default BurgerBuilder;