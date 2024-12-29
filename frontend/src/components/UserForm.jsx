/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function UserForm({ onSubmit, editingUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPassword('');
    }
  }, [editingUser]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'El correo no es válido.';
    if (!editingUser && !password) newErrors.password = 'La contraseña es obligatoria.';
    else if (password && password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label>Nombre</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label>Correo</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!editingUser}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-success">
        {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
      </button>
    </form>
  );
}

export default UserForm;
