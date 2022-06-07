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

	const [quantity, setQuantity] = useState(1);

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
				productName: name,
				productPrice: price,
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
					text: 'Successfully added to cart'
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
				<Form className="text-white" onSubmit={e => addToCart(e, productId)}>
					<h1 className="mt-5 text-success">{name}</h1>
					<p>{description}</p>
					<h2 className="mt-5">Price: ₱ {price}</h2>
					
					<Form.Group className="mb-3">
						<Form.Label>Quantity:</Form.Label>
						<Form.Control 
							type="number"
							required
							value={quantity}
							onChange={e => setQuantity(parseInt(e.target.value))}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Total:</Form.Label>
						<Form.Control 
							type="number"
							required
							value={price * quantity}
							disabled
						/>
					</Form.Group>

					{quantity > 0 ?
						<>
							<style type="text/css">
							    {`
							    	.btn-flat {
							    		background-color: purple;
							    		color: white;
							    	}

							    	.btn-xxl {
							    		padding: 1rem 1.5rem;
							    		font-size: 1.5rem;
							    	}
							    `}
							</style>
							<Button variant="flat" className="mb-5" type="submit">Add to Cart</Button>
						</>
						:
						<>
							<style type="text/css">
							    {`
							    	.btn-flat {
							    		background-color: purple;
							    		color: white;
							    	}

							    	.btn-xxl {
							    		padding: 1rem 1.5rem;
							    		font-size: 1.5rem;
							    	}
							    `}
							</style>
							<Button variant="flat" className="mb-5" disabled>Add to Cart</Button>
						</>
					}
				</Form>
			:
			<Form className="text-white">
				<h1 className="mt-5 text-success">{name}</h1>
				<p>{description}</p>
				<h2 className="mt-5">Price: ₱ {price}</h2>
				
				<Form.Group className="mb-3">
					<Form.Label>Quantity:</Form.Label>
					<Form.Control 
						type="number"
						required
						value={quantity}
						onChange={e => setQuantity(parseInt(e.target.value))}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Total:</Form.Label>
					<Form.Control 
						type="number"
						required
						value={price * quantity}
						disabled
					/>
				</Form.Group>

				<>
					<style type="text/css">
					    {`
					    	.btn-flat {
					    		background-color: purple;
					    		color: white;
					    	}

					    	.btn-xxl {
					    		padding: 1rem 1.5rem;
					    		font-size: 1.5rem;
					    	}
					    `}
					</style>
					<Button variant="flat" className="mb-5" as={Link} to="/login">Login to Order</Button>
				</>
			</Form>
	);
};