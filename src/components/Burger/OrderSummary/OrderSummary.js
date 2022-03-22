import React from 'react'

function orderSummary(props) {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey ]}
                </li>)
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>
    </React.Fragment>
  )
}

export default orderSummary
