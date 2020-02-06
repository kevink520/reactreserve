import { Header, Segment, Button, Icon } from 'semantic-ui-react';

const CartItemList = () => {
  const user = false;
  return (
    <Segment
      secondary
      color="teal"
      inverted
      textAlign="center"
      placeholder
    >
      <Header icon>
        <Icon name="shopping basket" />
        No products in your cart. Add some!
      </Header>
      <div>
        {user ? (
          <Button color="orange">
            View Products
          </Button>
        ) : (
          <Button color="blue">
            Login to Add Products
          </Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
