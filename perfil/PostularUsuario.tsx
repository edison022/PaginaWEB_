import React, { useState } from 'react';
import '../../assets/css/postularUsuario.css';

const PostularUsuario: React.FC = () => {
  const [formData, setFormData] = useState({
    seleccion: 'seleccionar',
    valor: '',
    meses: 'seleccionar',
    nombre: '',
    correo: '',
    contacto: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { seleccion, valor, meses, nombre, correo, contacto } = formData;

    if (seleccion === 'seleccionar' || meses === 'seleccionar') {
      alert('Por favor, seleccione un área y un nivel académico válidos.');
      return;
    }

    if (!nombre || !correo || !contacto) {
      alert('Por favor, complete todos los campos obligatorios (Nombre, Correo y Número de contacto).');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(correo)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contacto)) {
      alert('Por favor, ingrese un número de contacto válido.');
      return;
    }

    const servicios = JSON.parse(localStorage.getItem('servicios') || '[]');
    const nuevoServicio = { seleccion, valor, meses, nombre, correo, contacto };

    servicios.push(nuevoServicio);
    localStorage.setItem('servicios', JSON.stringify(servicios));

    alert('Servicio registrado con éxito.');
    setFormData({
      seleccion: 'seleccionar',
      valor: '',
      meses: 'seleccionar',
      nombre: '',
      correo: '',
      contacto: ''
    });
  };

  const handleRegresar = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="fondo">
      <div className="container">
        <h2>Registro de Servicios</h2>
        <form id="registro-servicios-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="opciones-servicio">Seleccione el área al que desea postular:</label>
            <select
              id="opciones-servicio"
              name="seleccion"
              value={formData.seleccion}
              onChange={handleChange}
              required
            >
              <option value="seleccionar">Áreas</option>
              <option value="Ingeniería">Ingeniería</option>
              <option value="Licenciaturas">Licenciaturas</option>
              <option value="Ciencias médicas">Ciencias médicas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="valor-servicio">Describa cuál es su experiencia como docente</label>
            <input
              type="text"
              id="valor-servicio"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="meses">¿Cuál es su nivel académico?</label>
            <select
              id="meses"
              name="meses"
              value={formData.meses}
              onChange={handleChange}
              required
            >
              <option value="seleccionar">Nivel académico</option>
              <option value="1">Título de tercer nivel</option>
              <option value="2">Título de cuarto nivel</option>
              <option value="3">Título de quinto nivel</option>
              <option value="4">Título de sexto nivel</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Número de contacto:</label>
            <input
              type="tel"
              id="contacto"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        <button type="button" id="regresarPerfilButton" onClick={() => handleRegresar('/perfil')}>
          Regresar al perfil
        </button>
      </div>
    </div>
  );
};

export default PostularUsuario;
