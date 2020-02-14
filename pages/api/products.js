import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products;  
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = (pageNum - 1) * pageSize;
    products = await Product.find().skip(skips).limit(pageSize);
  }

  res.status(200).json({ products, totalPages });
};

