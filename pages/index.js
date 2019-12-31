import { useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

const Home = ({ products }) => (
  <ProductList products={products} />
);

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;
  const { data } = await axios.get(url);
  return { products: data };
};

export default Home;
