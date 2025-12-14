import jwt from "jsonwebtoken";

export const userautha = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(402).json({ message: "please first login" })
    }
    try {
        const splittedtoken = token.split(' ')[1]
        const finaltoken = jwt.verify(splittedtoken, process.env.JWT_SECRET)
        if (finaltoken.id) {
            req.userid = finaltoken.id
            next()
        }
        else {
            return res.status(401).json({ message: "you are not authorised login again" })
        }
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }

}