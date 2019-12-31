import { Input } from 'semantic-ui-react';

const AddProductToCart = () => (
  <Input
    type="number"
    min="1"
    value="1"
    placeholder="Quantity"
    action={{
      color: 'orange',
      content: 'Add to Cart',
      icon: 'plus cart',
    }}
  />
);

export default AddProductToCart;
