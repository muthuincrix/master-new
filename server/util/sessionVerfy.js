
const sessions = require('../models/session.js')

exports.isLogin = async (email) => {
    let data = await sessions.find();
    return data.filter((task) => task.session.email == email);
  }