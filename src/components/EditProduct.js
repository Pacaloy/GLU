import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}) {

	const [showEdit, setShowEdit] = useState(false);

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	console.log(product)
	console.log(productId)
	const openEdit = (productId)  => {
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		});
		setShowEdit(true);
	};

	const closeEdit = () => setShowEdit(false);

	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`http://localhost:4000/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully updated'
				});

				fetchData();
				closeEdit();
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Please try again'
				});

				fetchData();
				closeEdit();
			}
		});
	};

	return (
		<>
			<Button onClick={() => openEdit(product)}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
								type="text"
								required
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
								type="text"
								required
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
								type="number"
								required
								value={price}
								onChange={e => setPrice(e.target.value)}
							/>
						<Form.Group>
							
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={closeEdit}>Close</Button>
						<Button type="submit">Save Changes</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};