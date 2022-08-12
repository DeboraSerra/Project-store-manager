import React, { useContext } from 'react';
import { useEffect } from 'react';
import { MyContext } from '../provider/Provider';
import { SMain, SH2, SP, SCard, SCardsSect, SLink } from '../styles';

const Products = () => {
  const { loading, products, setSellProduct, fetchProducts } = useContext(MyContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSale = (id) => {
    setSellProduct(id);
  }

  return (
    <SMain>
      <SH2>Products List</SH2>
      <SLink to="/products/new">Add a new product</SLink>
      <SCardsSect>
        {!loading && products.map(({ id, name }) => (
          <SLink key={ id } to="/sales/new" onClick={ () => handleSale(id) }>
            <SCard>
              <SP>{name}</SP>
            </SCard>
          </SLink>
        ))}
      </SCardsSect>
    </SMain>
  )
}

export default Products;
