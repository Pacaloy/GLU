import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from './../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

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

		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

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

				fetch('http://localhost:4000/users/details', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);

					if (data.isAdmin === true) {
						localStorage.setItem('isAdmin', data.isAdmin);

						setUser({
							isAdmin: data.isAdmin
						});

						navigate('/products');
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
			<Form onSubmit={e => authentication(e)}>
				<h1>Login</h1>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control 
						type="email"
						placeholder="Enter your email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
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
					<Button variant="dark" type="submit">Submit</Button>
					:
					<Button variant="dark" type="submit" disabled>Submit</Button>	
				}
			</Form>
	);
};