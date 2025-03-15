import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mountImage from '../assets/mount.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Login failed');
            }

            const data = await response.json();
            console.log("Login Response:", data);

            if (data.userrole == 'Admin') { 
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials: Please try again later!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="w-[900px] bg-gray-900 rounded-xl flex shadow-lg">

                <div className="w-1/2">
                    <img src={mountImage} alt="Signup" className="h-full w-full" />
                </div>

                <div className="w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                    <p className="text-gray-400 mb-6">
                        Don't have an account?
                        <Link to="/signup" className="text-purple-400 hover:underline"> Sign up</Link>
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="pword"
                            className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="flex items-center mb-6">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label className="text-gray-400 text-sm">
                                Remember Me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 text-center"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
