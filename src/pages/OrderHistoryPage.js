import OrderHistoryCard from './../components/OrderHistoryCard';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './../UserContext';

export default function OrderHistoryPage() {
	const { user } = useContext(UserContext);

	const [userHistory, setUserHistory] = useState([])

	const orderHistory = () => {
		fetch('https://ecommerce-product-store.herokuapp.com/orders/history', {
			headers: {
				Authorization: `Bearer ${user.accessToken}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setUserHistory(data);
		});
	};

	useEffect(() => {
		orderHistory();
	}, []);

	return (
		(user.accessToken !== null) ?
			(user.isAdmin) ?
				<Navigate to="/products"/>
				:
				<OrderHistoryCard historyProp={userHistory} />
			:
			<Navigate to="/" />
	);
};