import React, { Component } from 'react'
import Burger from '../../components/Layout/Burger/Burger'

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:2,
            cheese:1,
            bacon:2,
            meat:2
        },
    }
    render() {
        return (
            <React.Fragment>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Build Controls</div>
            </React.Fragment>
        )
    }
}
