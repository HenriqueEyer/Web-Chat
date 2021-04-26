const Message = require('../models/message');

exports.create = async (param) => {
  try {
    const { content, author } = param;
    const data = await new Message({ content, author }).create();
    return data.ops[0];
  } catch (err) {
    return { message: 'Algo deu errado' };
  }
};

exports.getAll = async () => {
  try {
    const data = await Message.getAll();
    return data;
  } catch (err) {
    return { message: 'Algo deu errado' };
  }
}
