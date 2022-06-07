import './App.css';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import SpecificProduct from './pages/SpecificProduct';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <UserProvider value={{user, setUser, unsetUser}}>
            <BrowserRouter>
                <AppNavBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/products/:productId" element={<SpecificProduct />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/history" element={<OrderHistoryPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Container>
                <Footer />
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
