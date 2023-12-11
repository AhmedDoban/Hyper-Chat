// import schema from Req model
import mongoose from "mongoose";
import Reuest_Model from "./../Models/Reuest_Model.js";
import Users_Model from "./../Models/Users_Model.js";
import { validationResult } from "express-validator";

// GET user Requests
const Get_User_Request = async (Req, Res) => {
  const { _id } = Req.body;

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
    const SearchingRequest = await Reuest_Model.aggregate([
      {
        $match: {
          To: new mongoose.Types.ObjectId(_id),
          Accepted: false,
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "From",
          foreignField: "_id",
          as: "User",
        },
      },
      { $unwind: "$User" },
      {
        $project: {
          __v: 0,
          _id: 0,
          "User._id": 0,
          "User.password": 0,
          "User.__v": 0,
          "User.Token": 0,
        },
      },
    ]);
    console.log(SearchingRequest);
    return Res.json({
      Status: "Success",
      data: SearchingRequest,
    });
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// GET Search Request
const Search_Request = async (Req, Res) => {
  const { UserName, _id } = Req.body;

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
    const SearchingRequest = await Users_Model.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(_id) },
        },
      },
      {
        $addFields: {
          name: { $concat: ["$FirstName", " ", "$LastName"] },
          User_Name: { $concat: ["$FirstName", "$LastName"] },
        },
      },
      {
        $match: {
          $or: [
            { FirstName: { $regex: new RegExp(UserName, "i") } },
            { LastName: { $regex: new RegExp(UserName, "i") } },
            { name: { $regex: new RegExp(UserName, "i") } },
            { User_Name: { $regex: new RegExp(UserName, "i") } },
          ],
        },
      },

      {
        $project: {
          __v: 0,
          password: 0,
          Token: 0,
          User_Name: 0,
          name: 0,
        },
      },
    ]);
    const Request = await Reuest_Model.find({
      $or: [{ From: _id }, { To: _id }],
    });

    const CheckFriendOrRequest = await SearchingRequest.map((Search) => ({
      ...Search,
      If_User_Request: Request.map((user) =>
        user.To.toString() == Search._id.toString() ? true : false
      ).includes(true),

      If_User_Requested_To: Request.map((user) =>
        user.From.toString() == Search._id.toString() ? true : false
      ).includes(true),

      If_User_Friend: Request.map((user) =>
        (user.To.toString() == Search._id.toString() && user.Accepted) ||
        (user.From.toString() == Search._id.toString() && user.Accepted)
          ? true
          : false
      ).includes(true),
    }));

    return Res.json({
      Status: "Success",
      data: [...CheckFriendOrRequest],
    });
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Create request
const Create_Request = async (Req, Res) => {
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
    const SearchingRequest = await Reuest_Model.findOne({ From, To });
    if (SearchingRequest === null) {
      const NewRequest = new Reuest_Model({
        From: From,
        To: To,
      });
      await NewRequest.save();
      return Res.json({
        Status: "Success",
        message: "Request Send Successfully",
      });
    } else {
      // Error in creation handelar because the request created before
      return Res.json({
        Status: "Faild",
        message: "Sorry you send that request before !",
      });
    }
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// delete request
const Delete_Request = async (Req, Res) => {
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
    const SearchingRequest = await Reuest_Model.findOne({
      $or: [
        { From: From, To: To },
        { From: To, To: From },
      ],
    });
    if (SearchingRequest === null) {
      // Error in creation handelar because there is no request created before
      return Res.json({
        Status: "Faild",
        message: "Sorry we cand delete that request !",
      });
    } else {
      await Reuest_Model.deleteOne({
        $or: [
          { From: From, To: To },
          { From: To, To: From },
        ],
      });
      return Res.json({
        Status: "Success",
        message: "Request deleted Successfully !",
      });
    }
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// delete request
const Update_Request = async (Req, Res) => {
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
    const SearchingRequest = await Reuest_Model.findOne({
      $or: [
        { From: From, To: To },
        { From: To, To: From },
      ],
    });
    if (SearchingRequest === null) {
      // Error in creation handelar because there is no request created before
      return Res.json({
        Status: "Faild",
        message: "Sorry we cand update that request !",
      });
    } else {
      await Reuest_Model.updateOne(
        {
          $or: [
            { From: From, To: To },
            { From: To, To: From },
          ],
        },
        { $set: { Accepted: true } }
      );
      return Res.json({
        Status: "Success",
        message: "Request Updated Successfully !",
      });
    }
  } catch (err) {
    // Error in creation handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};
export default {
  Create_Request,
  Delete_Request,
  Get_User_Request,
  Search_Request,
  Update_Request,
};
