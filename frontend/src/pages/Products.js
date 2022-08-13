import React, { useContext } from 'react';
import { useEffect } from 'react';
import { MyContext } from '../provider/Provider';
import { BsTrash } from 'react-icons/bs';
import { SMain, SH2, SP, SCard, SCardsSect, SLink, SSect } from '../styles';

const Products = () => {
  const { loading, products, setSellProduct, fetchProducts } = useContext(MyContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSale = (id) => {
    setSellProduct(id);
  }

  const handleClick = async (id) => {
    const url = `http://localhost:3005/products/${id}`;
    const obj = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    await fetch(url, obj);
    fetchProducts();
  }

  return (
    <SMain>
      <SH2>Products List</SH2>
      <SLink to="/products/new">Add a new product</SLink>
      <SCardsSect>
        {!loading && products.map(({ id, name }) => (
          <SCard>
            <BsTrash className="trash" onClick={ () => handleClick(id) } />
            <SLink key={ id } to="/sales/new" onClick={ () => handleSale(id) }>
              <SSect>
                <SP>{name}</SP>
              </SSect>
            </SLink>
          </SCard>
        ))}
      </SCardsSect>
    </SMain>
  )
}

export default Products;
