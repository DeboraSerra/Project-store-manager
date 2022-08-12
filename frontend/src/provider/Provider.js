import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    loading: true,
    productSell: [],
    sales: [],
  });
  const { products, loading, productSell, sales } = state;

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

  const fetchSales = async () => {
    setState((prevSt) => ({
      ...prevSt,
      loading: true,
    }))
    const url = 'http://localhost:3005/sales';
    const response = await fetch(url);
    const data = await response.json();
    setState((prevSt) => ({
      ...prevSt,
      sales: data,
      loading: false,
    }));
  };

  const fetchSaleDets = async (id) => {
    setState((prevSt) => ({
      ...prevSt,
      loading: true,
    }))
    const url = `http://localhost:3005/sales/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setState((prevSt) => ({
      ...prevSt,
      loading: false,
    }));
    return data;
  }

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
    sales,
    fetchSales,
    fetchSaleDets,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;
