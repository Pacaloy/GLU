import { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from './../UserContext';

export default function AppNavBar() {
	const { user } = useContext(UserContext);

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand as={Link} to="/">
				<img 
					alt="logo"
					src="https://imgur.com/ekDjBFe.jpg"
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{' '}
				GLU
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/products">Products</Nav.Link>

					{(user.accessToken !== null) ?
						<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						:
						<>
							<Nav.Link as={Link} to="/login">Login</Nav.Link>
							<Nav.Link as={Link} to="/register">Register</Nav.Link>
						</>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};