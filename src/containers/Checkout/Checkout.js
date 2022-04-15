import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet, Routes, Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  });
  const [price, setPrice] = useState(0)

  const { state } = useLocation();
  useEffect(() => {
   return ()=>{if(state){
      setIngredients(state.ingredients);
      setPrice(state.price);
    };}
  });

  const checkoutCancelled = () => {
    navigate(-1);
  }

  const checkoutContinued = () => {
    navigate('/checkout/contact-data');
  }

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelled}
        checkoutContinued={checkoutContinued} />
      <Routes>
        <Route path={'contact-data'} element={<ContactData ingredients={ingredients} price={price}/>} />
      </Routes>
      <Outlet/>
    </div>
  )
}

export default Checkout;