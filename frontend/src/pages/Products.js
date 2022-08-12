import React, { useContext } from 'react';
import { MyContext } from '../provider/Provider';
import { SMain, SH2, SP, SCard, SCardsSect, SLink } from '../styles';

const Products = () => {
  const { loading, products, setSellProduct } = useContext(MyContext);

  const handleSale = (id) => {
    setSellProduct(id);
  }

  return (
    <SMain>
      <SH2>Products List</SH2>
      <SLink to="/products/new">Add a new product</SLink>
      <SCardsSect>
        {!loading && products.map(({ id, name }) => (
          <SLink to="/sales/new" onClick={ () => handleSale(id) }>
            <SCard key={ id }>
              <SP>{name}</SP>
            </SCard>
          </SLink>
        ))}
      </SCardsSect>
    </SMain>
  )
}

export default Products;
