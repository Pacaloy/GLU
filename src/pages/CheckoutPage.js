import Checkout from './../components/Checkout';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './../UserContext';

export default function CheckoutPage() {

	const { user } = useContext(UserContext);

	const [orders, setOrders] = useState([]);

	const fetchOrders = () => {
		fetch('http://localhost:4000/orders/getOrders', {
			headers: {
				Authorization: `Bearer ${user.accessToken}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setOrders(data);
		});
	};

	useEffect(() => {
		fetchOrders();
	}, []);
console.log(user)

	return (
		(user.isAdmin) ?
			<Navigate to="/products"/>
			:
			<Checkout ordersData={orders} fetchOrders={fetchOrders} />
	);
};