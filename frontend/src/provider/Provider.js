import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    loading: true,
  });
  const { products, loading } = state;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const url = 'http://localhost:3005/products';
    const response = await fetch(url);
    const data = await response.json();
    setState((prevSt) => ({
      ...prevSt,
      products: data,
      loading: false,
    }));
  };

  const value = {
    products,
    loading,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;
