import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = await jwt.verify(token, SECRECT_KEY);
            req.userId = decodedData?.id;
        } else {
            decodedData = await jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;