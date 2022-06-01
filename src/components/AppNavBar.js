import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AppNavBar() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand as={Link} to="/">GLU</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav>
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/products">Products</Nav.Link>
					<Nav.Link as={Link} to="/login">Login</Nav.Link>
					<Nav.Link as={Link} to="/register">Register</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};