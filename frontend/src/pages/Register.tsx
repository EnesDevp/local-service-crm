import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        businessName: ''
    });
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth?.register(form.name, form.email, form.password, form.businessName);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        name="businessName"
                        type="text"
                        placeholder="Business Name"
                        value={form.businessName}
                        onChange={handleChange}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <button type="submit" className="w-full bg-green-600 text-white text-xl font-semibold py-4 rounded-lg hover:bg-green-700 transition">
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                    Already have an account? <a href="/login" className="text-blue-600 font-semibold">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;