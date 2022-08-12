import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Products, Sales, SaleDetail, AddProduct } from './pages';
import { SHeader, SNav, SNavLink, SNavLi } from './styles';

function App() {
  return (
    <div className="App">
      <SHeader>
        <h1>Sales Manager</h1>
        <SNav>
          <SNavLi>
            <SNavLink to="/">Home</SNavLink>
          </SNavLi>
          <SNavLi>
            <SNavLink to="/products">Products</SNavLink>
          </SNavLi>
          <SNavLi>
            <SNavLink to="/sales">Sales</SNavLink>
          </SNavLi>
        </SNav>
      </SHeader>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<Sales />} />
          <Route path="/sales/:id" element={<SaleDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
