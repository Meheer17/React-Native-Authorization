import * as jwt from 'jsonwebtoken';

export async function JWTVerify(req: Request) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return undefined
    }

    if(!process.env.JWT_SECRET) {
        return false;
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        return false;
    }
}