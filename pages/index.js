import { useEffect } from 'react';
import axios from 'axios';

const Home = ({ products }) => {
  console.log(products);
  /*const getProducts = () => {
    const url = 'http://localhost:3000/api/products';
    try {
      const { data } = await axios.get('http://localhost:3000/api/products');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);*/

  return <>home</>;
};

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';
  const { data } = await axios.get('http://localhost:3000/api/products');
  return { products: data };
};

export default Home;
