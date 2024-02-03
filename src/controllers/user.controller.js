const db = require("../db")

class UserController {
    async createUser(req, res) {
        try {
            console.log(req)
            const { login, password } = req.body;

            const newUser = await db.query("insert into users (login, password) values ($1, $2) returning *", [login, password]);
            res.status(200).json(newUser).send()

        } catch (e) {
            res.status(400).send()
        }
    }

    async authUser(req, res) {
        try {
            const { login, password } = req.body;
            const userPassword = await db.query(`select password from users where users.login = $1`, [login]);

            console.log(userPassword);

            if (userPassword.rowCount === 0) {
                res.status(404).json("нет такого пользователя").send()
            } else if (password !== userPassword.rows[0].password) {
                res.status(400).json("неверный пароль").send()
            }

            res.status(200).json("ok").send()
        } catch (e) {
            res.status(400).send()
        }
    }

    async updateUser(req, res) {
        try {
            const user = await db.query("update users set latitude = $1, longitude = $2 where login = $3 returning *", [req.body.latitude, req.body.longitude, req.params.login])
            res.status(200).json(user).send();
        } catch (e) {
            res.status(400).send();
        }
    }

    async getFriendsLocations(req, res) {
        const {login} = req.body;

        const friendsLocations = await db.query(`select * from users_friends as uf, users as u
            where 
            u.login = uf.userLogin 
            
            uf.friendLogin = login or uf.userLogin = login
            `)
    }
}

const userController = new UserController()

module.exports = userController