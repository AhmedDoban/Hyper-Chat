// import schema from Req model
import Message_Model from "./../Models/Message_Model.js";
import { validationResult } from "express-validator";

// GET user Messages
const Get_All_Messages = async (Req, Res) => {
  const { From, To } = Req.body;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't create request please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    const p2p_Messages = await Message_Model.aggregate([
      { $match: { Users: { $all: [From, To] } } },
      { $sort: { createdAt: 1 } },
      {
        $lookup: {
          from: "Users",
          localField: "Sender",
          foreignField: "_id",
          as: "User",
        },
      },
      { $unwind: "$User" },
      {
        $project: {
          __v: 0,
          "User._id": 0,
          "User.password": 0,
          "User.__v": 0,
          "User.Token": 0,
          Users: 0,
        },
      },
    ]);

    return Res.json({
      Status: "Success",
      data: p2p_Messages,
    });
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Send Message
const Send_Message = async (Req, Res) => {
  const { From, To, Message } = Req.body;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't create request please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    const NewMessage = new Message_Model({
      Message: Message,
      Sender: From,
      Users: [From, To],
    });
    await NewMessage.save();

    return Res.json({
      Status: "Success",
    });
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  Get_All_Messages,
  Send_Message,
};
