import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate, useParams } from 'react-router-dom';
import UserContext from './../UserContext';

export default function SpecificProduct() {

	const {productId} = useParams();
	console.log(productId);

	const {user} = useContext(UserContext);
	console.log(user);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		});
	});

	const addToCart = (e, productId) => {
		e.preventDefault();

		fetch('http://localhost:4000/orders/createOrder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		});
	};
console.log(quantity)
console.log(typeof quantity)
console.log(price)
console.log(typeof price)
	return (
		(user.accessToken !== null) ?
			(user.isAdmin === true) ?
				<Navigate to="/products" />
				:
				<Form onSubmit={e => addToCart(e, productId)}>
					<h1>{name}</h1>
					<p>{description}</p>
					<h2>Price: {price}</h2>
					
					<Form.Group>
						<Form.Label>Quantity:</Form.Label>
						<Form.Control 
							type="number"
							required
							value={quantity}
							onChange={e => setQuantity(parseInt(e.target.value))}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Total:</Form.Label>
					</Form.Group>

					<Button type="submit">Add to Cart</Button>
				</Form>
			:
			<>
				<h1>Details</h1>
				<Button as={Link} to="/login">Login to Order</Button>
			</>
	);
};