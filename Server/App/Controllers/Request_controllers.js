// import schema from Req model
import Reuest_Model from "./../Models/Reuest_Model.js";
import { validationResult } from "express-validator";

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
};
