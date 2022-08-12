import React, { useContext, useEffect } from 'react';
import { MyContext } from '../provider/Provider';
import { SCard, SCardsSect, SH2, SLink, SMain, SP } from '../styles';

const Sales = () => {
  const { fetchSales, sales, loading } = useContext(MyContext);
  useEffect(() => {
    fetchSales();
  }, []);
  const salesToRender = () => {
    const newSale = [];
    sales.forEach(({ saleId }) => {
      if (!newSale.includes(saleId)) newSale.push(saleId);
    })
    return newSale;
  }
  return (
    <SMain>
      <SH2>Sales</SH2>
      <SCardsSect>
        {!loading &&
          salesToRender().map((id) => (
            <SLink to={ `/sales/${id}` }>
              <SCard key={ id }>
                <SP>Sale number</SP>
                <SP>{id}</SP>
              </SCard>
            </SLink>
          ))}
      </SCardsSect>
    </SMain>
  );
};

export default Sales;
