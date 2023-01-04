import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from './../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
	const { user } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');

	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if ((email !== '' && password !== '' && verifyPassword !== '') && (password === verifyPassword)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, verifyPassword]);

	function registerUser(e) {
		e.preventDefault();

		fetch('http://localhost:4000/users/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data) {
				Swal.fire({
					title: 'Registration Successful',
					icon: 'success',
					text: 'You have successfully registered'
				});

				navigate('/login');
			} else {
				Swal.fire({
					title: 'Registration Failed',
					icon: 'error',
					text: 'Please try again'
				});
			}
		});
	};

	return (
		(user.accessToken !== null) ?
			<Navigate to="/products" />
			:
			<Form onSubmit={e => registerUser(e)} className="text-white">
				<h1 className="my-5">Register</h1>
				
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
					<Form.Label>Password:</Form.Label>
					<Form.Control 
						type="password"
						placeholder="Enter your password"
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Verify Password:</Form.Label>
					<Form.Control 
						type="password"
						placeholder="Verify your password"
						required
						value={verifyPassword}
						onChange={e => setVerifyPassword(e.target.value)}
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
	);
};