import { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';

const Cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const handleRemoveFromCart = async productId => {
    try {
      const url = `${baseUrl}/api/cart`;
      const token = cookie.get('token');
      const payload = {
        params: { productId },
        headers: { Authorization: token },
      };

      const response = await axios.delete(url, payload);
      setCartProducts(response.data);
    } catch(error) {

    }
  };

  return (
    <Segment>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary products={cartProducts} />
    </Segment>
  );
};

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }

  try {
    const url = `${baseUrl}/api/cart`;
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return { products: response.data };
  } catch(error) {
    console.log(error);
  }
};

export default Cart;
