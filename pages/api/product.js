import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

const handleGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
};

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(204).json({});
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGetRequest(req, res);
      break;
    case 'DELETE':
      handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed.`);
      break;
  }
};

