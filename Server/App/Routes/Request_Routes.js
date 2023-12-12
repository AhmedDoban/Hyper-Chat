import express from "express";
import JWT from "../Utils/JWT.js";
import Request_controllers from "../Controllers/Request_controllers.js";
import { body } from "express-validator";

const Router = express.Router();

// Routes Handelar /API/Request/GetAllRequests
Router.route("/GetAllRequests").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Request_controllers.Get_User_Request
);

// Routes Handelar /API/Request/GetContacts
Router.route("/GetContacts").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Request_controllers.Get_User_Contacts
);
// Routes Handelar /API/Request/GetContacts
Router.route("/GetContacts/:id").post(
  JWT.Verify_Token,
  Request_controllers.Get_User_Spacific_contact
);
// Routes Handelar /API/Request/Search
Router.route("/Search").post(
  JWT.Verify_Token,
  [body("UserName").notEmpty().withMessage("User Name is not Valid")],
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Request_controllers.Search_Request
);

// Routes Handelar /API/Request/Create
Router.route("/Create").post(
  JWT.Verify_Token,
  [
    body("From").notEmpty().withMessage("From is not Valid"),
    body("To").notEmpty().withMessage("To is not Valid"),
  ],
  Request_controllers.Create_Request
);

// Routes Handelar /API/delte/Create
Router.route("/Delete").post(
  JWT.Verify_Token,
  [
    body("From").notEmpty().withMessage("From is not Valid"),
    body("To").notEmpty().withMessage("To is not Valid"),
  ],
  Request_controllers.Delete_Request
);

// Routes Handelar /API/delte/Create
Router.route("/Update").post(
  JWT.Verify_Token,
  [
    body("From").notEmpty().withMessage("From is not Valid"),
    body("To").notEmpty().withMessage("To is not Valid"),
  ],
  Request_controllers.Update_Request
);

export default Router;
