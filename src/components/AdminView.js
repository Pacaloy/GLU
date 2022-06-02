import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminView(props) {

	console.log(props);
	const { productsData, fetchData } = props;
	console.log(productsData);
	console.log(fetchData);

	const [ products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map(product => {
			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<EditProduct product={product._id} fetchData={fetchData} />
					</td>
					<td>
						<ArchiveProduct />
					</td>
				</tr>
			);
		});
		setProducts(productsArr);
	}, [productsData]);

	return (
		<>
			<h2>Admin Dashboard</h2>

			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
						<th>AVAILABILITY</th>
						<th colSpan={2}>ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>
		</>
	);
};