import db from "../database/database.connection.js"


export async function validateAuth(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.status(404).send("Envie um token")

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`,[token])
        if (!session) return res.status(404).send("Seu token não é válido")

        res.locals.token = token
        res.locals.userId = session.rows[0].userId

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}