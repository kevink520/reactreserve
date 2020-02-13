import { useState, useEffect } from 'react';
import { Button, Segment, Divider } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';

const CartSummary = ({ products, handleCheckout, success }) => {
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
        <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ''}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey="pk_test_eEMDttgyEDCan3bmCuTm3miP0030oeCrGl"
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>
  );
};

export default CartSummary;
