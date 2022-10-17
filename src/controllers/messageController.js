const Message = require("../models/message");
const messageController = {
  get: async (req, res) => {
    try {
      const { from, to } = req.body;

      const messages = await Message.find({ users: { $all: [from, to] } }).sort(
        { updateAt: 1 }
      );
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.status(200).json(projectedMessages);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  add: async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const data = await Message.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;
