import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';

const Cart = () => {
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
}

export default Cart;
