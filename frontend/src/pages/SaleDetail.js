import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../provider/Provider';
import { SH2, SListCard, SMain, SP, SVerticalCards } from '../styles';

const SaleDetail = () => {
  const { fetchSaleDets, loading, products } = useContext(MyContext);
  const [state, setState] = useState({
    prods: [],
    date: '',
    saleDetail: [],
  });
  const { prods, date, saleDetail } = state;

  const { id } = useParams();

  useEffect(() => {
    getProds();
  }, []);

  const getProds = async () => {
    const saleDetail = await fetchSaleDets(id);
    console.log(saleDetail)
    const ids = saleDetail.map(({ productId}) => productId);
    setState((prevSt) => ({
      ...prevSt,
      saleDetail,
      prods: products.filter((prod) => ids.includes(prod.id)),
      date: saleDetail[0].date,
    }));
  }

  return (
    <SMain>
      <SH2>Sale number {id}</SH2>
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
