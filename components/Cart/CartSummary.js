import { useState, useEffect } from 'react';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

const CartSummary = ({ products }) => {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState('0.00');
  const [stripeAmount, setStripeAmount] = useState(0);
  useEffect(() => {
    setCartEmpty(products.length === 0);
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products, setCartEmpty, calculateCartTotal]);

  return (
    <>
      <Divider />
      <Segment
        clearing
        size="large"
      >
        <strong>Sub total:</strong> ${cartAmount}
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>
  );
};

export default CartSummary;
