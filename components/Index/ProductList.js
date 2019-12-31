import { Card } from 'semantic-ui-react';

const mapProductsToItems = products => (
  products.map(({
    name,
    mediaUrl,
    price,
    _id,
  }) => ({
    header: name,
    image: mediaUrl,
    meta: `$${price}`,
    color: 'teal',
    fluid: true,
    childKey: _id,
    href: `/product?_id=${_id}`,
  }))
);

const ProductList = ({ products }) => (
  <Card.Group
    stackable
    itemsPerRow="3"
    centered
    items={mapProductsToItems(products)}
  />
);

export default ProductList;
