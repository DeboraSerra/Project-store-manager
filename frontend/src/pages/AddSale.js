import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../provider/Provider';
import { SButton, SCardsSect, SCheck, SForm, SH2, SInput, SLabel, SListCard, SMain, SNum, SP, SVerticalCards } from '../styles';

const AddSale = () => {
  const { productSell, products, setSellProduct, setQuantity } = useContext(MyContext);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3005/sales';
    const obj = {
      Method: 'POST',
      Headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productSell),
    }
    const response = await fetch(url, obj);
    const data = await response.json();
    if (data.message) {
      setError(data.message);
      return;
    }
    navigate('/sales');
  }

  return (
    <SMain>
      <SH2>Add a sale</SH2>
      <SForm onSubmit={ handleSubmit }>
        {error && <SP>{error}</SP>}
        <SCardsSect>
          {products.map(({ id, name }) => (
            <SLabel key={ id } htmlFor={ id }>
              {name}
              <SCheck
                type="checkbox"
                value={ id }
                name={ name }
                id={ id }
                onChange={ () => setSellProduct(id) }
                checked={ productSell.some((prod) => prod.productId === id) }
              />
            </SLabel>
          ))}
        </SCardsSect>
        <SVerticalCards>
          {productSell.map(({ productId }) => (
            <SListCard key={ productId }>
              <SP>{products.find(({ id }) => id === productId).name}</SP>
              <SNum
                type="number"
                placeholder="quantity"
                name="quantity"
                min="0"
                value={ productSell
                  .find(({ productId: id }) => productId === id ).quantity}
                onChange={ ({ target: { value } }) => setQuantity(productId, value)}
              />
            </SListCard>
          ))}
        </SVerticalCards>
        <SButton type="button" onSubmit={ handleSubmit }>
          Sell
        </SButton>
      </SForm>
    </SMain>
  )
}

export default AddSale;
