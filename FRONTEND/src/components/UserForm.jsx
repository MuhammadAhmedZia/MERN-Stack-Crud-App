import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:4000/users');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:4000/user/${editId}`, form);
    } else {
      await axios.post('http://localhost:4000/createuser', form);
    }
    setForm({ name: '', email: '', password: '' });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: '' });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/user/${id}`);
    fetchUsers();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 py-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Management</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="col-span-full md:col-span-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="col-span-full md:col-span-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="col-span-full md:col-span-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        
        <button className="col-span-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all outline-none">
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <div className="mt-8 overflow--y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">USERS LIST</h2>
        <div className="overflow-x-scroll">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Password</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-x-auto'>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50 text-wrap">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4  ">{user.password}</td>
                  <td className="py-2 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="inline-flex items-center bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                    >
                      <FaEdit className="mr-1" /> 
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
