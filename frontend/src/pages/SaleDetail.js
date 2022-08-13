import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../provider/Provider';
import { BsTrash } from 'react-icons/bs';
import { SH2, SListCard, SMain, SP, SVerticalCards } from '../styles';

const SaleDetail = () => {
  const { fetchSaleDets, loading, products } = useContext(MyContext);
  const [state, setState] = useState({
    prods: [],
    date: '',
    saleDetail: [],
    error: '',
  });
  const { prods, date, saleDetail } = state;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProds();
  }, []);

  const getProds = async () => {
    const saleDetail = await fetchSaleDets(id);
    const ids = saleDetail.map(({ productId}) => productId);
    setState((prevSt) => ({
      ...prevSt,
      saleDetail,
      prods: products.filter((prod) => ids.includes(prod.id)),
      date: saleDetail[0].date,
    }));
  }

  const handleClick = async () => {
    const url = `http://localhost:3005/sales/${id}`;
    const obj = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    await fetch(url, obj);
    navigate('/sales');
  }

  return (
    <SMain>
      <SH2>Sale number {id}</SH2>
      <BsTrash className="trash-icon" onClick={ handleClick } />
      <SP style={{ margin: '12px 0' }}>Sold in: {new Date(date).toLocaleDateString()}</SP>
      <SVerticalCards>
        {!loading && prods.map((prod, index) => (
          <SListCard key={ prod.id }>
            <SP>{prod.name}</SP>
            <SP>{saleDetail[index].quantity}</SP>
          </SListCard>
        ))}
      </SVerticalCards>
    </SMain>
  )
}

export default SaleDetail;
