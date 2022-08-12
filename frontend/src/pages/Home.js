import React from 'react';
import { SHome, SHomeTitle, SLink, SHomeP, SHomeSubtitle, SHomeSect } from '../styles';

const Home = () => {
  return (
    <SHome>
      <SHomeTitle>Welcome</SHomeTitle>
      <SHomeP>To see or add a product, click the products link</SHomeP>
      <SHomeP>To see or add a sale, click the sales link</SHomeP>
      <SHomeSect>
        <section>
          <SHomeSubtitle>To add a new product</SHomeSubtitle>
          <SLink to="/products/new">Click Here</SLink>
        </section>
        <section>
          <SHomeSubtitle>To add a new sale</SHomeSubtitle>
          <SLink to="/sales/new">Click Here</SLink>
        </section>
      </SHomeSect>
    </SHome>
  )
}

export default Home;
