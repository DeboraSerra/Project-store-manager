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

  const setSellProduct = (id, quantity = 1) => {
    let newList = [];
    if (productSell.some((prod) => prod.productId === id)) {
      newList = productSell.filter((prod) => prod.productId !== id);
    } else {
      newList = [...productSell, { productId: id, quantity }];
    }
    setState((prevSt) => ({
      ...prevSt,
      productSell: newList,
    }))
  }

  const setQuantity = (id, quantity) => {
    if (quantity === '0') {
      setState((prevSt) => ({
        ...prevSt,
        productSell: productSell.filter(({ productId }) => productId !== id)
      }))
    } else {
      setState((prevSt) => ({
        ...prevSt,
        productSell: productSell.map((item) => {
          if (item.productId === id) return { productId: id, quantity: +quantity }
          return item;
        })
      }))
    }
  }

  const clearSellProds = () => {
    setState((prevSt) => ({
      ...prevSt,
      productSell: [],
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
    fetchProducts,
    setQuantity,
    clearSellProds,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;
