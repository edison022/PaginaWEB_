import React, { useEffect, useState } from 'react';
import '../../assets/css/perfil.css';

interface Usuario {
  username: string;
  nombres: string;
  apellidos: string;
  correo: string;
  celular: string;
  edad: string;
}

interface Servicio {
  seleccion: string;
  valor: string;
  meses: string;
  nombre: string;
  correo: string;
  contacto: string;
}

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    setUsuario(usuarios[0]);

    const serviciosRegistrados = JSON.parse(localStorage.getItem('servicios') || '[]');
    setServicios(serviciosRegistrados);
  }, []);

  const handleCerrarSesion = () => {
    window.location.href = '/login';
  };

  const handleRegresar = (url: string) => {
    window.location.href = url;
  };

  const eliminarServicio = (index: number) => {
    const updatedServicios = servicios.filter((_, i) => i !== index);
    setServicios(updatedServicios);
    localStorage.setItem('servicios', JSON.stringify(updatedServicios));
  };

  return (
    <div className="fondo">
      <div className="container" id="container">
        <h2>Mi Perfil</h2>
        {usuario && (
          <div id="user-profile">
            <p><strong>Nombre de Usuario:</strong> {usuario.username}</p>
            <p><strong>Nombres:</strong> {usuario.nombres}</p>
            <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
            <p><strong>Correo Electrónico:</strong> {usuario.correo}</p>
            <p><strong>Número de Celular:</strong> {usuario.celular}</p>
            <p><strong>Edad:</strong> {usuario.edad}</p>
          </div>
        )}
        <h1>Postulaciones realizadas</h1>
        <ul id="lista-servicios">
          {servicios.length === 0 ? (
            <p>No se han registrado ningún plan.</p>
          ) : (
            servicios.map((servicio, index) => (
              <li key={index}>
                <strong>Área #{index + 1}:</strong> {servicio.seleccion}<br />
                <strong>Experiencia como docente:</strong> {servicio.valor}<br />
                <strong>Nivel académico:</strong> título de {servicio.meses} nivel<br />
                <strong>Nombre:</strong> {servicio.nombre}<br />
                <strong>Correo:</strong> {servicio.correo}<br />
                <strong>Número de contacto:</strong> {servicio.contacto}<br />
                <button onClick={() => eliminarServicio(index)}>Eliminar</button>
              </li>
            ))
          )}
        </ul>
        <button type="button" id="regresar-principal" onClick={() => handleRegresar('/login')}>Cerrar sesión</button>
        <button type="button" id="regresar-postular" onClick={() => handleRegresar('/postularUsuario')}>Postular</button>
      </div>
    </div>
  );
};

export default Perfil;
