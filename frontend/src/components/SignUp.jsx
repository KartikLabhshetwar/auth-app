import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)

   async function signUp(){
        if(!password || !username){
            setError("Please fill in both username and password.");
            return;
        }

       const method = await axios.post("http://localhost:8080/signup", 
        {
            username: username,
            password: password
        }).catch(error => {
            setError('Error signing up: ' + error.message);
            console.error('Error signing up:', error);
        });


        if(method.status === 200){
            const token = method.data.token;
            localStorage.setItem('token', token);
            alert("User Signed up Successfully!");
            navigate("/login", {replace: true})
        } else{
            setError("Failed to sign up!")
        }
    
    }

    return (
        <div className='w-full max-h-svh max-w-xs m-auto bg-indigo-100 rounded p-5'>
                <div className="flex flex-col justify-center items-center">
                <div>
                <h1 className='text-2xl font-bold text-center p-10'>Sign Up Page</h1>
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
                            onClick={signUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
        </div>
    );
}