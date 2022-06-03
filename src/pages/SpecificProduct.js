import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import UserContext from './../UserContext';
import Swal from 'sweetalert2';

export default function SpecificProduct() {

	const {productId} = useParams();
	console.log(productId);
	const navigate = useNavigate();

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

			if (data) {
				Swal.fire({
					title: 'Added',
					icon: 'success',
					text: 'Products successfully added to Cart'
				});

				navigate('/products');
			} else {
				Swal.fire({
					title: 'Registration Failed',
					icon: 'error',
					text: 'Please try again'
				});
			}
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
						<Form.Control 
							type="number"
							required
							value={price * quantity}
							disabled
						/>
					</Form.Group>

					{quantity > 0 ?
						<Button type="submit">Add to Cart</Button>
						:
						<Button disabled>Add to Cart</Button>
					}
				</Form>
			:
			<>
				<h1>Details</h1>
				<Button as={Link} to="/login">Login to Order</Button>
			</>
	);
};