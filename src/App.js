import './App.css';
import AppNavBar from './components/AppNavBar';
import AppRoutes from './routes';
import Footer from './components/Footer';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';

function App() {
	const [user, setUser] = useState({
		accessToken: localStorage.getItem('accessToken'),
		isAdmin: localStorage.getItem('isAdmin') === "true"
	});

	const unsetUser = () => {
		localStorage.clear();
	};

	return (
		<UserProvider value={{ user, setUser, unsetUser }}>
			<BrowserRouter>
				<AppNavBar />
				<Container>
					<AppRoutes />
				</Container>
				<Footer />
			</BrowserRouter>
		</UserProvider>
	);
};

export default App;
