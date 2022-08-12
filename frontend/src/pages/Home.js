import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Home.module.css';

const Home = () => {
  return (
    <section className={ style.home }>
      <h2 className={ style.title }>Welcome</h2>
      <p className={ style.p }>To see or add a product, click the products link</p>
      <p className={ style.p }>To see or add a sale, click the sales link</p>
      <section className={ style.sect }>
        <section className={ style.link_sect }>
          <h3>To add a new product</h3>
          <Link className={ style.link } to="/products/new">Click Here</Link>
        </section>
        <section className={ style.link_sect }>
          <h3>To add a new sale</h3>
          <Link className={ style.link } to="/products/new">Click Here</Link>
        </section>
      </section>
    </section>
  )
}

export default Home;
