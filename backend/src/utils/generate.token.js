import jwt from "jsonwebtoken";

async function generateToken(user) {
    const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

      return token;
}

export default generateToken;