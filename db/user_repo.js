const db = require('./db');

class UserRepository {
    _name = 'name';
    _password = 'password';
    _profileImage = 'profileImage';

    async createNewUser(name, password) {
        await db.query(
            `INSERT INTO users (${this._name}, ${this._password}) values ($1, $2) RETURNING *`,
            [name, password],
        );
    }

    async getUserByName(name) {
        await db.query(`SELECT * FROM users WHERE ${this._name} = $1`, [name]);
    }

    // change IDs to users' names later
    async getUsersInRoom(roomId) {
        await db.query(`SELECT user_id FROM users_in_rooms WHERE room_id = $1`, [roomId]);
    }

    async updateUser(userId, name, profileImage) {
        await db.query(
            `UPDATE users set ${this._name} = $1, ${this._profileImage} = $2 WHERE id = $3 RETURNING *`,
            [name, profileImage, userId],
        );
    }

    async deleteUser(userId) {
        await db.query(`DELETE FROM users WHERE id = $1`, [userId]);
    }
}

module.exports = new UserRepository();
