import React from 'react';
import style from '../styles/Home.module.css';

const Home = () => {
  return (
    <section className={ style.home }>
      <h2 className={ style.title }>Welcome</h2>
      <p className={ style.p }>To see or add a product, click the products link</p>
      <p className={ style.p }>To see or add a sale, click the sales link</p>
    </section>
  )
}

export default Home;
