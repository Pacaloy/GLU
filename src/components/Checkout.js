import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Checkout({ordersData, fetchOrders}) {

	const [orders, setOrders] = useState([]);

	const navigate = useNavigate();

	const deleteOrder = (orderId) => {
		fetch(`http://localhost:4000/orders/${orderId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Order removed'
				})

				fetchOrders();
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})

				fetchOrders();
			}
		});
	};
 
	useEffect(() => {
		const ordersArr = ordersData.map(order => {
			if (order.isPaid === true) {
				return null;
			} else {
				return (
					<tr key={order._id}>
						<td>{order.products[0].productName}</td>
						<td>{order.products[0].productPrice}</td>
						<td>{order.products[0].quantity}</td>
						<td>{order.totalAmount}</td>
						<td><Button onClick={() => deleteOrder(order._id)}>Remove</Button></td>
					</tr>
				);
			}
		});

		setOrders(ordersArr);
	}, [ordersData]);

	console.log(ordersData)


	let totalSum = 0;

	ordersData.forEach(order => {
		if (order.isPaid === true) {
			totalSum += 0;
		} else {
			totalSum += order.totalAmount;
		}
	});

	console.log(totalSum)

	const checkout = () => {
		fetch('http://localhost:4000/orders/checkout', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Orders Paid'
				})

				navigate('/');
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again'
				})

				navigate('/products');
			}
		});
	};


	return(
		<>
			<h2>Checkout Page</h2>

			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{orders}
				</tbody>

				<tbody>
					<tr>
						{(totalSum > 0) ?
							<th colSpan={3}><Button onClick={() => checkout()}>Checkout</Button></th>
							:
							<th colSpan={3}><Button disabled>Checkout</Button></th>
						}
						<th colSpan={2}>Total: ₱ {totalSum}</th>
					</tr>
				</tbody>
			</Table>
		</>
	);
};