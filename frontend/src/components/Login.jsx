import axios from 'axios';
import { useState, useEffect } from 'react';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    async function signIn(){
        if(!password || !username || !token){
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/login", 
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if(response.status === 200){
                setIsLoggedIn(true);
                alert("User Log in Successful!");
            } else{
                setError("Failed to login in!")
            }
        } catch (error) {
            setError('Error while login: ' + error.message);
            console.error('Error while login:', error);
        }
    }

    if (isLoggedIn) {
        return <div>
            <h1 className='text-3xl font-bold text-center p-10'>You are logged in!</h1>

        </div>
    }

    return (
        <div className='w-full max-h-svh max-w-xs m-auto bg-indigo-100 rounded p-5'>
            
            <div className="flex flex-col justify-center items-center">
                <div>
                <h1 className='text-2xl font-bold text-center p-10'>Login Page</h1>
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500">Username</label>
                    <input
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-indigo-500">Password</label>
                    <input
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type='password'
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="text-red-500 mb-6">{error}</div>
                )}

                <div>
                    <button
                        className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                        onClick={signIn}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}