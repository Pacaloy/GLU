import './App.css';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken'),
        isAdmin: localStorage.getItem('isAdmin') === "true"
    });

    const unsetUser = () => {
        localStorage.clear();
    };

    return (
        <UserProvider value={{user, setUser, unsetUser}}>
            <BrowserRouter>
                <AppNavBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
