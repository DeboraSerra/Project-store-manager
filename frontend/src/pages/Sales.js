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
      <SLink to="/sales/new">Add a new sale</SLink>
      <SCardsSect>
        {!loading &&
          salesToRender().map((id) => (
            <SLink key={ id } to={ `/sales/${id}` }>
              <SCard>
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
