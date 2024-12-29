/* eslint-disable react/prop-types */
function UserTable({ users, onEdit, onDelete }) {
    return (
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => onEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default UserTable;
  