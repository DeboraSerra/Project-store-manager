import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    loading: true,
    productSell: [],
  });
  const { products, loading, productSell } = state;

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

  const setSellProduct = (id) => {
    const product = products.find((prod) => prod.id === id);
    setState((prevSt) => ({
      ...prevSt,
      productSell: [...prevSt.productSell, product],
    }))
  }

  const value = {
    products,
    loading,
    productSell,
    setSellProduct,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;
