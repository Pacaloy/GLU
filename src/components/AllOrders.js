import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AllOrders({orderProp}) {

	console.log(orderProp)

	const [orderList, setOrderList] = useState([]);

	useEffect(() => {
		const ordersArr = orderProp.map(order => {
			return (
				<tr key={order._id}>
					<td>{order._id}</td>
					<td>{order.userId}</td>
					<td>{order.purchasedOn}</td>
					<td>{order.products[0].productName}</td>
					<td>{order.products[0].productPrice}</td>
					<td>{order.products[0].quantity}</td>
					<td>{order.totalAmount}</td>
					<td>{(order.isPaid) ? 'Paid' : 'Not Paid'}</td>
				</tr>
			);
		});
		setOrderList(ordersArr);
	}, [orderProp]);

	return (
		<>
			<h1 className="mt-5 text-white">All Orders</h1>

			<Table striped bordered hover responsive variant="dark" size="sm" className="mb-5">
				<thead className="text-info">
					<tr>
						<th>Order ID</th>
						<th>User ID</th>
						<th>Date Ordered</th>
						<th>Item</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Status</th>
					</tr>
				</thead>

				<tbody>
					{orderList}
				</tbody>
			</Table>
		</>
	);
};