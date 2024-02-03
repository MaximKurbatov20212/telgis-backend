const db = require('../db')

class FriendController {
    async addFriend(req, res)  {
        try {
            const {userLogin, friendLogin} = req.body;

            console.log(userLogin, friendLogin);

            const requestStatusID = 1;

            const hasMirrorRequest = await db.query("select * from users_friends where users_friends.userLogin = $2 and users_friends.friendLogin = $1", [userLogin, friendLogin])

            console.log(hasMirrorRequest.rowCount)

            if (hasMirrorRequest.rowCount !== 0) {
                console.log("-> friends")
                await db.query("insert into users_friends (userLogin, friendLogin, statusID) values($1, $2, $3) returning *", [userLogin, friendLogin, 2])
                await db.query("delete from users_friends as u where u.userLogin = $2 and u.friendLogin = $1", [userLogin, friendLogin])
            }
            else {
                console.log("-> request")
                await db.query("insert into users_friends (userLogin, friendLogin, statusID) values($1, $2, $3) returning *", [userLogin, friendLogin, 1])
            }

            res.status(200).send()
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }
}

const friendController = new FriendController()

module.exports = friendController