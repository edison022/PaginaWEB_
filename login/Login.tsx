import React, { useState } from 'react';
import '../../assets/css/login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find((user: { username: string; password: string }) => user.username === username && user.password === password);

    if (usuarioEncontrado) {
      showMessage('Inicio de sesión exitoso.', 'success');
      window.location.href = '/perfil';
    } else {
      showMessage('Credenciales incorrectas. Por favor, inténtelo nuevamente.', 'error');
    }
  };

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    if (type === 'success') {
      alert('Inicio de sesión exitoso.');
    } else if (type === 'error') {
      alert('Credenciales incorrectas. Por favor, inténtelo nuevamente.');
    }
  };

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form id="inicio-sesion-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div id="message" className={message.type}>{message.text}</div>
      <div className="buttons">
        <button type="button" onClick={() => handleNavigation('/')}>Regresar a la pestaña principal</button>
        <button type="button" onClick={() => handleNavigation('/registro')}>¿No tienes cuenta? Regístrate</button>
        <button type="button" onClick={() => handleNavigation('/loginAdministrador')}>Iniciar sesión como administrador</button>
      </div>
    </div>
  );
};

export default Login;
