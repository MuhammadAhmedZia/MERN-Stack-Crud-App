import axios from 'axios';
import React, { useEffect, useState } from 'react'

function User() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({name: '' , email: '' , password: ''});
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:4000/users')
    setUsers(res.data)
  }

  useEffect(() => {
    fetchUsers();    
  
    
  }, [])

const handleSubmit = async (e) => {
    e.preventDefault();
    if(editId){
        await axios.put(`http://localhost:4000/user/${editId}`, form)
    }else{
        await axios.post(`http://localhost:4000/createuser`, form)
    }
    setForm({name: '', email:'', password:''})
    setEditId(null);
    fetchUsers();
};

const handleEdit = async (user) => {
    setForm({name: user.name, email: user.email, password: user.password})
    setEditId(user._id);
}
const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/user/${id}`)
    fetchUsers();
}
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} name="name" placeholder='Enter Your Name' required autoCapitalize='true' autoComplete='false' />
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} name="email" placeholder='Enter Your email' required autoComplete='false' />
            <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}  name="password" placeholder='Enter Your password' required  />
            <button >{editId ? 'Update User' :'Add User'}</button>
        </form>
        <div className="">
            <table>
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, id) => (
                        <tr key={id}>
                            <td>{id+ 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={()=> deleteUser(user._id) }>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default User