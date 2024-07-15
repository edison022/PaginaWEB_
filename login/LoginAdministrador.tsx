import React, { useState } from 'react';
import '../../assets/css/loginAdministrador.css';

const LoginAdministrador: React.FC = () => {
  const [formData, setFormData] = useState({ useradmin: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { useradmin, password } = formData;
    
    if (useradmin === 'admin' && password === '123') {
      alert('Inicio de sesión exitoso.');
      window.location.href = '/gestionPostulaciones';
    } else {
      alert('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
    }
  };

  const handleRegresar = (url: string) => {
    window.location.href = url;
  };

  return (
    <div>
      <h1>Administrador</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="useradmin">Usuario:</label>
        <input type="text" id="useradmin" name="useradmin" value={formData.useradmin} onChange={handleChange} required /><br /><br />
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
        <input type="submit" value="Iniciar Sesión" />
      </form>
      <button type="button" id="regresar-sesionUsuario" onClick={() => handleRegresar('/login')}>
        Iniciar sesión como usuario
      </button>
    </div>
  );
};

export default LoginAdministrador;
