import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct({fetchData}) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [imageLink, setImageLink] = useState('');

	const [showAdd, setShowAdd] = useState(false);

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false); 
 
	const addProduct = (e) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_URL}products/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
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
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully added'
				});

				closeAdd()
				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Please try again'
				});

				fetchData()
			}

			setName('')
			setDescription('')
			setPrice(0)
			setImageLink('')
		});
	};

	return (
		<>
			<Button variant="success" className="mt-5 mb-4" onClick={openAdd}>Add New Product</Button>

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
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
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>
		</>
	);
};