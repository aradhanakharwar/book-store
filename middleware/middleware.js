import jwt from "jsonwebtoken";

export const middleware = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send({ message: "You are not an authorized user" })
    };

    const token = req.headers.authorization;
    console.log(token);
    

    jwt.verify(token, process.env.SECRETKEY, function (error) {
        if (error) {
            res.status(401).send({ message: "Please Login" })
        } else {
            next();
        }
    })
};