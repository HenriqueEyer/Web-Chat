const connection = require('../services/connection');

class Message {
  constructor({ content, author }) {
    this.content = content;
    this.author = author;
  }

  async create() {
    try {
      const { content, author } = this;
      const db = await connection();
      return await db.collection('messages').insertOne({
        content: content,
        hour: new Date(),
        author: author,
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      const db = await connection();
      const data = await db.collection('messages').find().toArray();
      if (!data) throw new Error('NotFoundError');
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Message;
