import axios from '../../axios-orders';
import React, { useEffect, useState } from 'react'
import Order from './Order/Order'
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        } 
        setLoading(false);
        setOrders(fetchedOrders);
      })
      .catch(err => setLoading(false));
  }, []);
  return (
    <div>
      {orders.map(order=><Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>)}
    </div>
  )
}

export default withErrorHandler(Orders, axios)
