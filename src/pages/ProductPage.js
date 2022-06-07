import AdminView from './../components/AdminView';
import UserView from './../components/UserView';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from './../UserContext';

export default function ProductPage() {

	const { user } = useContext(UserContext);

	const [ allProducts, setAllProducts ] = useState([]);

	const fetchData = () => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setAllProducts(data);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
	<>
		<h1 className="mt-5 text-white">Product Page</h1>
		{(user.isAdmin === true) ?
			<AdminView productsData={allProducts} fetchData={fetchData} />
			:
			<>
				{(user.accessToken !== null) ?
					<>
						<Button variant="success" as={Link} to="/checkout">Checkout</Button>
						<Button className="mx-3" variant="success" as={Link} to="/history">Order History</Button>
					</>
					:
					<>
						<Button variant="success" disabled>Checkout</Button>
						<Button className="mx-3" variant="success" disabled>Order History</Button>
					</>
				}
				<UserView productsData={allProducts} />
			</>
		}
	</>
	);
};