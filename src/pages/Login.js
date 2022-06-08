import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from './../UserContext';
import Swal from 'sweetalert2';

export default function Login() {
	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password]);

	function authentication(e) {
		e.preventDefault();

		fetch('https://ecommerce-product-store.herokuapp.com/users/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.accessToken !== undefined) {
				localStorage.setItem('accessToken', data.accessToken);
				setUser({
					accessToken: data.accessToken
				});

				Swal.fire({
					title: 'Login Success',
					icon: 'success',
					text: 'You are now login!'
				});

				fetch('https://ecommerce-product-store.herokuapp.com/users/details', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {
					if (data.isAdmin === true) {
						localStorage.setItem('isAdmin', data.isAdmin);

						setUser({
							isAdmin: data.isAdmin
						});

						navigate('/');
					} else {
						navigate('/');
					}
				});
			} else {
				Swal.fire({
					title: 'Login Failed',
					icon: 'error',
					text: 'Check your credentials'
				});
			}
		});
	};

	return (
		(user.accessToken !== null) ?
			<Navigate to="/products" />
			:
			<>
				<Form onSubmit={e => authentication(e)} className="text-white">
					<h1 className="my-5">Login</h1>
					
					<Form.Group className="mb-3">
						<Form.Label>Email:</Form.Label>
						<Form.Control 
							type="email"
							placeholder="Enter your email"
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control 
							type="password"
							placeholder="Enter your password"
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>

					{isActive ?
						<div className="mb-5">
							<Button variant="dark" type="submit">Submit</Button>
						</div>
						:
						<div className="mb-5">
							<Button variant="dark" type="submit" disabled>Submit</Button>	
						</div>
					}
				</Form>

				<div className="mb-5">
					<h4 className="text-white mb-3">Don't have an account?</h4>
					<Button variant="dark" as={Link} to="/register">Register</Button>	
				</div>
			</>
	);
};