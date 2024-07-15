import React from 'react';
import '../../assets/css/home.css';
// import 'normalize.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const Home: React.FC = () => {
  return (
    <div className="pestaña">
      <header className="arriba">
        <div className="barra">
          <nav className="logo">
            <a href="/" className="logoNombre">Uleam</a>
          </nav>
          <nav className="navegacion">
            <a href="/laboral" className="navegacion1"><i className="fa-solid fa-ranking-star"></i>Oferta laboral</a>
            {/* <a href="./inscripciones.html" className="navegacion2"><i className="fa-solid fa-hand-holding-heart"></i>Inscripción</a> */}
          </nav>
          <nav className="iniciarSesion">
            <a href="/login"><i className="fa-solid fa-circle-user"></i> Iniciar sesión</a>
          </nav>
        </div>
        <div className="banner">
          <div className="banner-contenedor">
            <div className="banner-contenido banner1">
              <h1 className="promocion-titulo">¿Aún no tienes cuenta?</h1>
              <p className="promocion-texto">Regístrate para aplicar a nuestra oferta laboral.</p>
              <a href="/registro" className="promocion-boton">ir</a>
            </div>
            {/* <div className="banner-contenido banner2">
              <h1 className="promocion-titulo">Mira nuestra oferta laboral</h1>
              <p className="promocion-texto"></p>
              <a href="./laboral.html" className="promocion-boton">ir</a>
            </div> */}
          </div>
        </div>
      </header>
      <main className="medio">
        <section className="seccion1">
          <h2 className="titulo">¿Estás buscando empleo mientras estudias o después de graduarte?</h2>
          <p className="descripcion">Explora las oportunidades laborales disponibles para estudiantes y egresados de la ULEAM.</p>
          <a href="/laboral" className="boton" target="_blank">Ver Ofertas</a>
        </section>
        <section className="seccion2">
          <article className="articulo">
            <h2 className="titulo">Empleos a medio tiempo</h2>
            <p className="descripcion">Encuentra trabajos que se ajusten a tu horario de clases.</p>
          </article>
          <article className="articulo">
            <h2 className="titulo">Prácticas Profesionales</h2>
            <p className="descripcion">Aplica para prácticas que complementen tu formación académica.</p>
          </article>
          <article className="articulo">
            <h2 className="titulo">Oportunidades para Egresados</h2>
            <p className="descripcion">Descubre empleos a tiempo completo diseñados para nuestros graduados.</p>
          </article>
        </section>
      </main>
      <footer className="abajo">
        <div className="redes-sociales">
          <a href="https://www.facebook.com" target="_blank" className="social-icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          {/* Puedes agregar más botones de redes sociales aquí */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
