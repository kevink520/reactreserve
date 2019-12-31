import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

