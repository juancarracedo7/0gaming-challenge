/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  const handleAddUser = async (user) => {
    await createUser(user);
    loadUsers();
  };

  const handleEditUser = async (user) => {
    await updateUser(editingUser._id, user);
    setEditingUser(null);
    loadUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <UserForm
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        editingUser={editingUser}
      />
      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default Users;
