import React, { useState, useEffect } from 'react';
import '../../assets/css/gestionPostulaciones.css';

interface Postulacion {
  carreraPostu: string;
  facultadPostu: string;
  sueldoPostu: string;
  jornada: string;
  detalles: string;
}

interface Servicio {
  seleccion: string;
  valor: string;
  meses: string;
  nombre: string;
  correo: string;
  contacto: string;
}

const GestionPostulaciones: React.FC = () => {
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [carreraPostu, setCarreraPostu] = useState('');
  const [facultadPostu, setFacultadPostu] = useState('Facultad 1');
  const [sueldoPostu, setSueldoPostu] = useState('');
  const [jornada, setJornada] = useState('');
  const [detalles, setDetalles] = useState('');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [aceptadas, setAceptadas] = useState<Servicio[]>([]);

  useEffect(() => {
    const storedPostulaciones = JSON.parse(localStorage.getItem('postulacionesRegistradas') || '[]');
    setPostulaciones(storedPostulaciones);
    const storedServicios = JSON.parse(localStorage.getItem('servicios') || '[]');
    setServicios(storedServicios);
    const storedAceptadas = JSON.parse(localStorage.getItem('postulacionesAceptadas') || '[]');
    setAceptadas(storedAceptadas);
  }, []);

  const registrarPostulacion = () => {
    if (!carreraPostu || !sueldoPostu || !jornada) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    if (isNaN(parseFloat(sueldoPostu))) {
      alert('El sueldo debe ser un número válido.');
      return;
    }

    if (detalles.length > 500) {
      alert('Los detalles no pueden exceder los 500 caracteres.');
      return;
    }

    const nuevaPostulacion: Postulacion = {
      carreraPostu,
      facultadPostu,
      sueldoPostu,
      jornada,
      detalles,
    };

    const updatedPostulaciones = [...postulaciones, nuevaPostulacion];
    setPostulaciones(updatedPostulaciones);
    localStorage.setItem('postulacionesRegistradas', JSON.stringify(updatedPostulaciones));

    setCarreraPostu('');
    setFacultadPostu('Facultad 1');
    setSueldoPostu('');
    setJornada('');
    setDetalles('');
  };

  const eliminarPostulacion = (index: number) => {
    const updatedPostulaciones = postulaciones.filter((_, i) => i !== index);
    setPostulaciones(updatedPostulaciones);
    localStorage.setItem('postulacionesRegistradas', JSON.stringify(updatedPostulaciones));
  };

  const aceptarPostulacion = (index: number) => {
    const postulacion = servicios[index];
    const updatedAceptadas = [...aceptadas, postulacion];
    setAceptadas(updatedAceptadas);
    localStorage.setItem('postulacionesAceptadas', JSON.stringify(updatedAceptadas));

    const updatedServicios = servicios.filter((_, i) => i !== index);
    setServicios(updatedServicios);
    localStorage.setItem('servicios', JSON.stringify(updatedServicios));
  };

  const eliminarServicio = (index: number) => {
    const updatedServicios = servicios.filter((_, i) => i !== index);
    setServicios(updatedServicios);
    localStorage.setItem('servicios', JSON.stringify(updatedServicios));
  };

  const eliminarAceptada = (index: number) => {
    const updatedAceptadas = aceptadas.filter((_, i) => i !== index);
    setAceptadas(updatedAceptadas);
    localStorage.setItem('postulacionesAceptadas', JSON.stringify(updatedAceptadas));
  };

  return (
    <div>
      <h1>Registro de postulación</h1>
      <form
        id="registroForm"
        onSubmit={(e) => {
          e.preventDefault();
          registrarPostulacion();
        }}
      >
        <label htmlFor="carreraPostu">Carrera:</label>
        <input type="text" id="carreraPostu" value={carreraPostu} onChange={(e) => setCarreraPostu(e.target.value)} required />
        <label htmlFor="facultadPostu">Facultad:</label>
        <select id="facultadPostu" value={facultadPostu} onChange={(e) => setFacultadPostu(e.target.value)} required>
          <option value="Facultad 1">Facultad de ingeniería</option>
          <option value="Facultad 2">Facultad Licenciaturas</option>
          <option value="Facultad 3">Facultad de ciencias médicas</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <label htmlFor="sueldoPostu">Sueldo:</label>
        <input type="number" id="sueldoPostu" value={sueldoPostu} onChange={(e) => setSueldoPostu(e.target.value)} required />
        <label htmlFor="jornada">Jornada:</label>
        <input type="text" id="jornada" value={jornada} onChange={(e) => setJornada(e.target.value)} required />
        <label htmlFor="detalles">Detalles:</label>
        <textarea id="detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
        <button type="submit">Registrar Postulación</button>
      </form>
      <h1>Lista de trabajos disponibles</h1>
      <ul id="listaPostulaciones">
        {postulaciones.map((postulacion, index) => (
          <li key={index}>
            Carrera: {postulacion.carreraPostu}<br />
            Facultad: {postulacion.facultadPostu}<br />
            Sueldo: {postulacion.sueldoPostu}<br />
            Jornada: {postulacion.jornada}<br />
            Detalles: {postulacion.detalles}<br />
            <button onClick={() => eliminarPostulacion(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h1>Lista de postulaciones recibidas:</h1>
      <ul id="lista-servicios">
        {servicios.length === 0 ? (
          <p>No se han recibido ninguna postulación.</p>
        ) : (
          servicios.map((servicio, index) => (
            <li key={index}>
              <strong>Área #{index + 1}:</strong> {servicio.seleccion}<br />
              <strong>Experiencia como docente:</strong> {servicio.valor}<br />
              <strong>Nivel académico:</strong> título de {servicio.meses} nivel<br />
              <strong>Nombre:</strong> {servicio.nombre}<br />
              <strong>Correo:</strong> {servicio.correo}<br />
              <strong>Número de contacto:</strong> {servicio.contacto}<br />
              <button onClick={() => aceptarPostulacion(index)}>Aceptar</button>
              <button onClick={() => eliminarServicio(index)}>Borrar</button>
            </li>
          ))
        )}
      </ul>
      <h1>Lista de postulaciones aceptadas</h1>
      <ul id="lista-aceptadas">
        {aceptadas.length === 0 ? (
          <p>No se han aceptado ninguna postulación.</p>
        ) : (
          aceptadas.map((postulacion, index) => (
            <li key={index}>
              <strong>Área aceptada #{index + 1}:</strong> {postulacion.seleccion}<br />
              <strong>Experiencia como docente:</strong> {postulacion.valor}<br />
              <strong>Nivel académico:</strong> título de {postulacion.meses} nivel<br />
              <strong>Nombre:</strong> {postulacion.nombre}<br />
              <strong>Correo:</strong> {postulacion.correo}<br />
              <strong>Número de contacto:</strong> {postulacion.contacto}<br />
              <button onClick={() => eliminarAceptada(index)}>Borrar</button>
            </li>
          ))
        )}
      </ul>
      <button type="button" id="regresar-opciones" onClick={() => (window.location.href = '/login')}>Regresar</button>
    </div>
  );
};

export default GestionPostulaciones;
