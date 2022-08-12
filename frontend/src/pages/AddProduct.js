import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SButton, SForm, SH2, SInput, SMain, SP } from '../styles';

const AddProduct = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const handleChange = ({ target }) => {
    setInput(target.value);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3005/products';
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: input }),
    }
    const response = await fetch(url, obj);
    const data = await response.json();
    if (data.message) {
      setError(data.message);
      return;
    }
    navigate('/products');
  }

  return (
    <SMain>
      <SH2>Add a new product</SH2>
      <SForm onSubmit={ handleSubmit }>
        {error && <SP>{error}</SP>}
        <SInput
          type="text"
          placeholder="Add the name of the product"
          value={ input }
          onChange={ handleChange }
        />
        <SButton onSubmit={ handleSubmit } type="submit">Add</SButton>
      </SForm>
    </SMain>
  )
}

export default AddProduct;
