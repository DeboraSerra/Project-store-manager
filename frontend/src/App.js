import { useContext } from 'react';
import './App.css';
import { MyContext } from './provider/Provider';

function App() {
  const { products, loading } = useContext(MyContext);
  if (loading) return <p>Loading</p>
  return (
    <div className="App">
      {products.map((prod) => (
        <p>{prod.name}</p>
      ))}
    </div>
  );
}

export default App;
