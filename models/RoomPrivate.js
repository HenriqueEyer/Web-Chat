const connection = require('../services/connection');
const { ObjectID } = require('mongodb');

class RoomPrivate {
  constructor({ users }) {
    this.users = users;
  }

  static async addMessagePrivate(params){
    try {
      const { message: { content, author }, users } = params;
      const sortedUser = users.sort();
      const db = await connection();
      return await db.collection('RoomPrivate').findOneAndUpdate(
        {
          "users1": sortedUser[0],
          "users2": sortedUser[1]
        },
        {
          $push: {
            messages: {
              content: content,
              hour: new Date(),
              author: author,
            }
          },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAllRoomPrivate() {
    try {
      const db = await connection();
      const data = await db.collection('RoomPrivate').find().toArray();
      if (!data) {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Nada encontrado`;
        throw notFoundError;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async getOneRoomPrivateById(id){
    try {
      const db = await connection();
      const data = await db.collection('RoomPrivate').findOne({
        _id: ObjectID(id)
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async getOneRoomPrivateByUsers(users){
    const db = await connection();
    const data = await db.collection('RoomPrivate').findOne({
      "users": { $all: [`${users[0]}`, `${users[1]}`] }
    });
    return data;
  }
}

module.exports = RoomPrivate;
