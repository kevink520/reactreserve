import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import baseUrl from '../utils/baseUrl';

const Product = ({ product, user }) => {
  return (
    <>
      <ProductSummary {...product} user={user} />
      <ProductAttributes {...product} user={user} />
    </>
  );
};

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const { data: product } = await axios.get(url, payload);
  return { product };
};

export default Product;
