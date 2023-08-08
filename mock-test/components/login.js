import React, { useState } from 'react';
import axios from 'axios'
import url from '../constants/url';

const Login = ({ onClose, onStart }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleOuterClick = () => {
        onClose && onClose();
    };

    const handleInnerClick = (e) => {
        e.stopPropagation(); 
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${url.apiRoot}/api/login`, {
                userId,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token)
            console.log('Logged in successfully', token);
            onClose();
            onStart()
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black z-50"
            onClick={handleOuterClick}
        >
            <div
                className="bg-white rounded-md p-8 text-[#000]"
                onClick={handleInnerClick}
            >
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-600">User ID</label>
                    <input
                        type="text"
                        id="userId"
                        className="mt-1 p-2 w-full border rounded-md bg-white"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 p-2 w-full border rounded-md bg-white "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full p-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                    onClick={handleLogin}
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default Login;
