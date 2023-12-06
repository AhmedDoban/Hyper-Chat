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
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "From",
          foreignField: "_id",
          as: "Users",
        },
      },
      { $unwind: "$Users" },
      {
        $project: {
          __v: 0,
          _id: 0,
          "Users._id": 0,
          "Users.password": 0,
          "Users.__v": 0,
          "Users.Token": 0,
        },
      },
    ]);
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
        $addFields: { name: { $concat: ["$FirstName", " ", "$LastName"] } },
        $addFields: {
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
          _id: 0,
          password: 0,
          Token: 0,
          "Request._id": 0,
          "Request.__v": 0,
          User_Name: 0,
          name: 0,
        },
      },
    ]);

    return Res.json({
      Status: "Success",
      data: [...SearchingRequest],
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
    const SearchingRequest = await Reuest_Model.findOne({ From, To });
    if (SearchingRequest === null) {
      // Error in creation handelar because there is no request created before
      return Res.json({
        Status: "Faild",
        message: "Sorry we cand delete that request !",
      });
    } else {
      await Reuest_Model.deleteOne({ From, To });
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

export default {
  Create_Request,
  Delete_Request,
  Get_User_Request,
  Search_Request,
};
