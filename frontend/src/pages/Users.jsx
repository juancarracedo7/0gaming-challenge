import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    try {
      await api.post('/users', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await api.put(`/users/${editingUser._id}`, {
        name,
        email,
        password
      });
      setEditingUser(null);
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Usuarios</h2>
      <button className="btn btn-secondary mb-3" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!editingUser}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
      </form>

      <hr />

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditUser(u)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
