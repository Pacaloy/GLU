import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}) {
	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [imageLink, setImageLink] = useState('');

	const [showEdit, setShowEdit] = useState(false);

	const openEdit = (productId)  => {
		fetch(`${process.env.REACT_APP_URL}products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setImageLink(data.imageLink);
		});

		setShowEdit(true);
	};

	const closeEdit = () => setShowEdit(false);

	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_URL}products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				imageLink: imageLink
			})
		})
		.then(res => res.json())
		.then(data => {
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
			<Button className="mt-2 mb-3" variant="info" onClick={() => openEdit(product)}>Update</Button>

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

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
								type="number"
								required
								value={price}
								onChange={e => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Image Link</Form.Label>
							<Form.Control 
								type="text"
								required
								value={imageLink}
								onChange={e => setImageLink(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Save Changes</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};