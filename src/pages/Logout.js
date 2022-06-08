import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './../UserContext';
import Swal from 'sweetalert2';

export default function Logout() {
	const { setUser, unsetUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser({
			accessToken: null
		});
	}, []);

	Swal.fire({
		title: 'Logged out',
		icon: 'success',
		text: 'Account signed out'
	});

	return (
		<Navigate to="/login" />
	);
};