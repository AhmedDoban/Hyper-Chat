import express from "express";
import JWT from "../Utils/JWT.js";
import Message_Controllers from "../Controllers/Message_Controllers.js";
import { body } from "express-validator";

const Router = express.Router();

// Routes Handelar /API/Message/GetAllMessages
Router.route("/GetAllMessages").post(
  JWT.Verify_Token,
  [body("From").notEmpty().withMessage("From is not Valid")],
  [body("To").notEmpty().withMessage("To is not Valid")],
  Message_Controllers.Get_All_Messages
);

// Routes Handelar /API/Message/GetAllMessages
Router.route("/SendMessages").post(
  JWT.Verify_Token,
  [body("From").notEmpty().withMessage("From is not Valid")],
  [body("To").notEmpty().withMessage("To is not Valid")],
  [body("Message").notEmpty().withMessage("MEssage is not Valid")],
  Message_Controllers.Send_Message
);

export default Router;
