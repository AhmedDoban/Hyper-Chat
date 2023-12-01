import express from "express";
import Users_controllers from "../Controllers/Users_controllers.js";
import { body } from "express-validator";
import JWT from "../Utils/JWT.js";
import Verify_User from "../Utils/Verify_User.js";

const Router = express.Router();

// Routes Handelar /API/Users/Login
Router.route("/Login").post(
  [
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Users_controllers.User_Login
);

// Routes Handelar /API/Users/Register
Router.route("/Register").post(
  [
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
    body("FirstName").notEmpty().withMessage("First Name is not Valid"),
    body("LastName").notEmpty().withMessage("Last Name is not Valid"),
  ],
  Users_controllers.User_Register
);

export default Router;
