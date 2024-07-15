import React, { useState } from 'react';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import '../../assets/css/registro.css';

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    nombres: '',
    apellidos: '',
    correo: '',
    celular: '',
    edad: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, nombres, apellidos, correo, celular, edad, password, confirmPassword } = formData;

    if (!username || !nombres || !apellidos || !correo || !celular || !edad || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (!/^[a-zA-ZÁÉÍÓÚÜáéíóúü\s]+$/.test(nombres) || !/^[a-zA-ZÁÉÍÓÚÜáéíóúü\s]+$/.test(apellidos)) {
      alert("Los campos 'nombres' y 'apellidos' solo pueden contener letras, espacios y caracteres acentuados.");
      return;
    }

    if (password.length < 3) {
      alert('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (isNaN(Number(edad)) || Number(edad) < 1 || Number(edad) > 99) {
      alert('La edad debe ser un número entre 1 y 99.');
      return;
    }

    const correoVali = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!correoVali.test(correo)) {
      alert('Ingrese una dirección de correo electrónico válida.');
      return;
    }

    const celularVali = /^\d{10}$/;
    if (!celularVali.test(celular)) {
      alert('Ingrese un número de teléfono válido (10 dígitos).');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      alert('El nombre de usuario debe tener entre 3 y 20 caracteres.');
      return;
    }

    const usuarioVali = /^[a-zA-Z0-9_]+$/;
    if (!usuarioVali.test(username)) {
      alert('El nombre de usuario solo puede contener letras, números y guiones bajos.');
      return;
    }

    const usuario = {
      username,
      nombres,
      apellidos,
      correo,
      celular,
      edad,
      password,
    };

    const usuarios = [usuario];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso.');
    setFormData({
      username: '',
      nombres: '',
      apellidos: '',
      correo: '',
      celular: '',
      edad: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleRegresar = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registro de Sesión</h2>
        <img src={Logo} alt="logo" className="logoRegistro" />
      </div>
      <form id="registro-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Número de celular:</label>
            <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="edad">Edad (1-99):</label>
            <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} min="1" max="99" required />
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar contraseña:</label>
            <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </div>
        <div className="bottom">
          <button type="submit">Registrar</button>
          <div id="message">{message}</div>
          <button type="button" onClick={() => handleRegresar('/')}>Regresar al inicio</button>
          <button type="button" onClick={() => handleRegresar('/login')}>Inicio de Sesión</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
