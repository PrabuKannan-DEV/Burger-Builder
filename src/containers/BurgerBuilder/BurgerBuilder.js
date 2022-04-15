import axios from '../../axios-orders'
import React, { useState, useEffect } from 'react'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'
import { useNavigate } from 'react-router-dom'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4
}


const BurgerBuilder = (props) => {
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState(null);
    const [total_price, setTotalPrice] = useState(0);
    const [purchasable, setPurchasable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        axios.get('https://react-my-burger-7ffa8-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => setIngredients(response.data))
            .catch(error => { setError(true) });
    }
        , []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        setPurchasable(sum > 0);
    }

    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = total_price
        const newPrice = oldPrice + priceAddition
        setIngredients(updatedIngredients); setTotalPrice(newPrice)
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = total_price
        const newPrice = oldPrice - priceDeduction
        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        // alert('You continue...')
        setLoading(true);
        // const order = {
        //     ingredients: ingredients,
        //     price: total_price,
        //     customer: {
        //         name: 'Prabu Kannan',
        //         phone: 8888888888,
        //         address: {
        //             street: "test street",
        //             pincode: 888888,
        //             country: 'India'
        //         },
        //         email: 'thankar@Channel.com',
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(() => {
        //         setLoading(false);
        //         setPurchasing(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //         setPurchasing(false);
        //     });
        // const queryParams = [];
        // for (let i in ingredients) {
        //    queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(ingredients[i]));
        // }
        // const querySting = queryParams.join('&');
        // console.log(querySting)
        navigate('/checkout', { state: { ingredients: ingredients, price: total_price } });
    }

    const disabledInfo = {
        ...ingredients
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    };
    let orderSummary = null;


    if (loading) {
        orderSummary = <Spinner />;
    }

    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ingredients) {

        burger = <React.Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={total_price}
                purchasable={!purchasable}
                ordered={purchaseHandler} />
        </React.Fragment>;

        orderSummary = <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={() => purchaseCancelHandler()}
            purchaseContinued={() => purchaseContinueHandler()}
            price={total_price} />;
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={() => purchaseCancelHandler()}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    )
}

export default withErrorHandler(BurgerBuilder, axios);
