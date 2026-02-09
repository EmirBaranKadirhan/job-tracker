const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    const token = req.cookies ? req.cookies.token : undefined;


    if (!token) {
        return res.status(401).send("Giris Yapmaniz Gerekli")
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Token'dan gelen decoded data:", decoded)

        req.userId = decoded.userId;                    // userId burada olusuyor

        next();

    } catch (error) {

        console.log((error))

        return res.status(401).send("Gecersiz Token")


    }

}


module.exports = authMiddleware