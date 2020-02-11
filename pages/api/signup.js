import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 10})) {
      return res.status(422).send('Name must be 3-10 characters long');
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters long');
    } else if (!isEmail(email)) {
      return res.status(422).send('Email must be valid');
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    
    console.log({ newUser });
    await new Cart({ user: newUser._id }).save();
    const token = jwt.sign({
      userId: newUser._id,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json(token);
  } catch(error) {
    console.error(error);
    res.status(500).send('Error signing up user. Please try again.');
  }
};

