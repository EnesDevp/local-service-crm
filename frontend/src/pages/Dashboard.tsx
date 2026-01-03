import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface Lead {
    _id: string;
    name: string;
    phone: string;
    serviceType: string;
    address: string;
    notes: string;
    status: string;
}

const Dashboard = () => {
    const auth = useContext(AuthContext);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        serviceType: 'Other',
        address: '',
        notes: ''
    });

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/leads');
            setLeads(res.data);
        } catch (error) {
            console.error('Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/leads', form);
            setLeads([...leads, res.data]);
            setForm({ name: '', phone: '', serviceType: 'Other', address: '', notes: '' });
        } catch (error) {
            console.error('Failed to create lead');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="p-8 text-center text-2xl">Loading...</div>;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Welcome, {auth?.user?.name}!</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg">
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button onClick={auth?.logout} className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg">
                            Logout
                        </button>
                    </div>
                </div>

                <div className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl mb-10`}>
                    <h2 className="text-3xl font-bold mb-6">Add New Lead</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="name"
                            placeholder="Customer Name"
                            value={form.name}
                            onChange={handleChange}
                            className="p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700"
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Phone (+90...)"
                            value={form.phone}
                            onChange={handleChange}
                            className="p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700"
                            required
                        />
                        <select
                            name="serviceType"
                            value={form.serviceType}
                            onChange={handleChange}
                            className="p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700"
                        >
                            <option value="Other">Other</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="HVAC">HVAC</option>
                        </select>
                        <input
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            className="p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700"
                        />
                        <textarea
                            name="notes"
                            placeholder="Notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 md:col-span-2"
                            rows={4}
                        />
                        <button type="submit" className="bg-blue-600 text-white text-2xl font-bold py-6 rounded-lg hover:bg-blue-700 transition md:col-span-2">
                            + Add Lead
                        </button>
                    </form>
                </div>

                <h2 className="text-3xl font-bold mb-6">Your Leads ({leads.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leads.length === 0 ? (
                        <p className="text-xl text-gray-600 dark:text-gray-400 col-span-full text-center">No leads yet. Add your first customer!</p>
                    ) : (
                        leads.map(lead => (
                            <div key={lead._id} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
                                <h3 className="text-2xl font-bold mb-2">{lead.name}</h3>
                                <p className="text-xl text-blue-600 mb-4">{lead.phone}</p>
                                <p className="text-lg mb-2">{lead.serviceType}</p>
                                {lead.address && <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{lead.address}</p>}
                                {lead.notes && <p className="text-lg italic mb-4">{lead.notes}</p>}
                                <p className="text-lg font-semibold text-green-600">Status: {lead.status}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;