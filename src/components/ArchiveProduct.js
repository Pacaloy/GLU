import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {

	const archiveToggle = (productId) => {
		fetch(`http://localhost:4000/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully disabled'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})

				fetchData()
			}
		});
	};

	const activateToggle = (productId) => {
		fetch(`http://localhost:4000/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
			if(data) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully enabled'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})

				fetchData()
			}
		});
	};

	return (
		(isActive) ?
			<Button variant="danger" onClick={() => archiveToggle(product)}>Disable</Button>
			:
			<Button variant="success" onClick={() => activateToggle(product)}>Enable</Button>
	);
};