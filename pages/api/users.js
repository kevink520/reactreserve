import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization token is missing');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const users = await User.find({ _id: { $ne: userId } })
      .sort({ role: 'asc' });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
};

