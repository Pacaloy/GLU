import AddProduct from './AddProduct'
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminView(props) {

	console.log(props);
	const {productsData, fetchData} = props;
	console.log(productsData);
	console.log(fetchData);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map(product => {
			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td>{product.imageLink}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<EditProduct product={product._id} fetchData={fetchData} />
						<ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} />
					</td>
				</tr>
			);
		});
		
		setProducts(productsArr);
	}, [productsData]);

	return (
		<>
			<div>
				<h1 className="text-success">Admin Dashboard</h1>
				<AddProduct fetchData={fetchData} />
			</div>

			<Table striped bordered hover responsive variant="dark" size="sm" className="mb-5">
				<thead className="text-info">
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
						<th>IMAGE LINK</th>
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