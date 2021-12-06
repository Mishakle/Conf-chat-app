const db = require('./db');

class RoomRepository {
    _name = 'name';
    _roomImage = 'roomImage';

    async createNewRoom(name) {
        await db.query(`INSERT INTO rooms (${this._name}) values ($1) RETURNING *`, [name]);
    }

    async getRoom(roomId) {
        await db.query(`SELECT ${this._name}, ${this._roomImage} FROM rooms WHERE id = $1`, [
            roomId,
        ]);
    }

    // add pagination
    async getAllRooms() {
        await db.query(`SELECT ${this._name}, ${this._roomImage} FROM rooms`);
    }

    async updateRoom(roomId, name, roomImage) {
        await db.query(
            `UPDATE rooms set ${this._name} = $1, ${this._roomImage} = $2 WHERE id = $3 RETURNING *`,
            [name, roomImage, roomId],
        );
    }

    async deleteRoom(roomId) {
        await db.query(`DELETE FROM rooms WHERE id = $1`, [roomId]);
    }
}

module.exports = new RoomRepository();
