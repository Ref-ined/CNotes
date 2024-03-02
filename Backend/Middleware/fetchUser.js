const jwt = require('jsonwebtoken');

const JWT_SECRET = "yoyo";


const fetchUser = (req, res, next) => {
    // Get user from the jwt token and append and add id to req object. 

    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valide token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.id = data.id;
        // res.send(user);
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valide token" });
    }
}

module.exports = fetchUser;
