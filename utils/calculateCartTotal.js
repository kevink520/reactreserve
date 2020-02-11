const calculateCartTotal = products => {
  const total = products.reduce((acc, p) => {
    acc += p.quantity * p.product.price;
    return acc;
  }, 0);
  
  const cartTotal = (total * 100 / 100).toFixed(2);
  const stripeTotal = Number(cartTotal);
  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;

