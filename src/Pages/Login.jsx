import React, { useState } from 'react';
import { loginUser } from '../Services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        if (!username || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
    
        const data = { username, password };
    
        try {
            const response = await loginUser(data);

            console.log(response.data);

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            localStorage.setItem('username', username); 
    
            setSuccessMessage('Login successful!');
            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            setErrorMessage('Invalid credentials');
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card shadow p-4">
                    <div className="card-body">
                        <h4 className="text-center mb-3">Login to your account</h4>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;