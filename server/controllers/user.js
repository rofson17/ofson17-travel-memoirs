import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Users from '../models/user.js';

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;

export const singin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await Users.findOne({ email });
        if (!existUser) return res.status(401).json({ message: 'invalid credentials' });

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'invalid credentials' });

        const token = jwt.sign({ email: existUser.email, id: existUser._id }, SECRECT_KEY, { expiresIn: '1h' });
        res.status(200).json({ result: existUser, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const singup = async (req, res) => {
    const { firstName, lastName, email, password, conformPassword } = req.body;
    try {
        const existUser = await Users.findOne({ email });

        if (existUser) return res.status(401).json({ message: 'user already exists' });
        if (password !== conformPassword) return res.status(401).json({ message: "password don't match" });

        const hashPassword = await bcrypt.hash(password, 12);
        const result = await Users.create({ name: `${firstName} ${lastName}`, email, password: hashPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRECT_KEY, { expiresIn: '1h' });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}