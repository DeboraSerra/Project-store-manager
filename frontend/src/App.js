import { Routes, Route, NavLink } from 'react-router-dom';
import { Home, Products, Sales } from './pages';
import style from './styles/Header.module.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className={ style.header }>
        <h1>Sales Manager</h1>
        <nav className={ style.nav }>
          <NavLink
            to="/"
            className={ ({ isActive }) => !isActive ? style.link : style.active_link}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={ ({ isActive }) => !isActive ? style.link : style.active_link}
          >
            Products
          </NavLink>
          <NavLink
            to="/sales"
            className={ ({ isActive }) => !isActive ? style.link : style.active_link}
          >
            Sales
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/products" element={ <Products /> } />
          <Route path="/products/new" element={ <Products />} />
          <Route path="/sales" element={ <Sales /> } />
          <Route path="/sales/new" element={ <Sales /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
