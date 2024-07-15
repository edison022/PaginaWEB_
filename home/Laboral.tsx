import React, { useEffect, useState } from 'react';
import '../../assets/css/laboral.css';

interface Postulacion {
  carreraPostu: string;
  facultadPostu: string;
  sueldoPostu: string;
  jornada: string;
  detalles: string;
}

const Laboral: React.FC = () => {
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

  useEffect(() => {
    actualizarListaPostulaciones();
  }, []);

  const actualizarListaPostulaciones = () => {
    const postulacionesRegistradas = JSON.parse(localStorage.getItem('postulacionesRegistradas') || '[]');
    setPostulaciones(postulacionesRegistradas);
  };

  const handleRegresar = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Lista de trabajos disponibles</h1>
      <ul id="listaPostulaciones">
        {postulaciones.map((postulacion, index) => (
          <li key={index}>
            Carrera: {postulacion.carreraPostu}<br />
            Facultad: {postulacion.facultadPostu}<br />
            Sueldo: {postulacion.sueldoPostu}<br />
            Jornada: {postulacion.jornada}<br />
            Detalles: {postulacion.detalles}
          </li>
        ))}
      </ul>
      <button type="button" id="regresar-opciones" onClick={handleRegresar}>Regresar</button>
    </div>
  );
};

export default Laboral;
