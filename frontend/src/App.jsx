import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-indigo-700">
        <h1 className="text-3xl font-bold text-center p-10 text-slate-200">User Authentication App using JWT token.</h1>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
