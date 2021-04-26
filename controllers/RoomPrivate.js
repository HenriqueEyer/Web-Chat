const RoomPrivate = require('../models/RoomPrivate');

exports.addMessagePrivate = async (param) => {
  try {
    const { users, message } = param;
    validateUser(users);
    const data = await RoomPrivate.addMessagePrivate({ message, users });
    return await returnMessage(data);
  } catch (err) {
    console.log('deu ruim')
    throw err
  }
};

exports.getOne = async (users) => {
  try {
    const data = await RoomPrivate.getOneRoomPrivateByUsers(users);
    return data;
  } catch (err) {
    throw err
  }
}

exports.getOneRoomPrivateById = async (id) => {
  try {
    const data = await RoomPrivate.getOneRoomPrivateById(id);
    return data;
  } catch (err) {
    throw err
  }
}

exports.getAllRoomPrivate = async () => {
  try {
    const data = await RoomPrivate.getAllRoomPrivate();
    return data;
  } catch (err) {
    throw err
  }
}

const validateUser = (users) => {
  if (!users) throw new Error('Invalidos usuarios')
  if (users[1] === users[0]) throw new Error('Cant send message to himself')
}

const returnMessage = async (data) => {
  const id = (!data.lastErrorObject.updatedExisting)
    ? data.lastErrorObject.upserted
    : data.value._id;
  return await RoomPrivate.getOneRoomPrivateById(id);
}
