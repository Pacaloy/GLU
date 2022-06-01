import { Form, Button } from 'react-bootstrap';

export default function Register() {
	return (
		<Form>
			<h1>Register</h1>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control 
					type="email"
					placeholder="Enter your email"
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Enter your password"
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Verify Password:</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Verify your password"
					required
				/>
			</Form.Group>

			<div className="d-grid">
			<Button variant="dark">Submit</Button>
			</div>
		</Form>
	);
};