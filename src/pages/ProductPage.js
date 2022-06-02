import AdminView from './../components/AdminView';
import UserView from './../components/UserView';
import { useContext, useEffect, useState } from 'react';
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
		<h1>Product Page</h1>
		{(user.isAdmin === true) ?
			<AdminView productsData={allProducts} fetchData={fetchData} />
			:
			<UserView />
		}
	</>
	);
};