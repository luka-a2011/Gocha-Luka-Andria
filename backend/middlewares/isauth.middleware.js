const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        req.role = payload.role; // You can check this in your routes for admin
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Token invalid or expired" });
    }
};

module.exports = isAuth;
