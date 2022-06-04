import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function OrderHistoryCard ({historyProp}) {
	console.log(historyProp)

	const [orderHistory, setOrderHistory] = useState([]);

	useEffect(() => {
		const historyArr = historyProp.map(history => {
			return (
				<tr key={history._id}>
					<td>{history._id}</td>
					<td>{history.purchasedOn}</td>
					<td>{history.products[0].productName}</td>
					<td>{history.products[0].productPrice}</td>
					<td>{history.products[0].quantity}</td>
					<td>{history.totalAmount}</td>
				</tr>
			);
		});
		setOrderHistory(historyArr);
	}, [historyProp]);

	return (
		<>
			<h1>User History</h1>

			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Order ID</th>
						<th>Date Ordered</th>
						<th>Item</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
				</thead>

				<tbody>
					{orderHistory}
				</tbody>
			</Table>
		</>
	);
};

