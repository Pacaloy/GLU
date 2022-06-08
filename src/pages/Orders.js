import AllOrders from './../components/AllOrders';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './../UserContext';

export default function Orders() {
	const { user } = useContext(UserContext);

	const [allOrders, setAllOrders] = useState([]);

	const getAllOrders = () => {
		fetch('http://localhost:4000/orders/getAllOrders', {
			headers: {
				Authorization: `Bearer ${user.accessToken}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setAllOrders(data);
		})
	};

	useEffect(() => {
		getAllOrders();
	}, [])

	return (
		(user.isAdmin) ?	
			<AllOrders orderProp={allOrders} />
			:
			<Navigate to="/" />
	);
};