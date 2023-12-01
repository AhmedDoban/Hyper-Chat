// import schema from user modle
import Users_Model from "../Models/Users_Model.js";
import bcrypt from "bcrypt";
import JWT from "../Utils/JWT.js";
import { validationResult } from "express-validator";

// login user authentication
const User_Login = async (Req, Res) => {
  const { email, password } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't login please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ email }, { __v: 0 });
    if (USER === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: "Faild",
        message: "Your Email not Valid .Please try again !",
      });
    }

    const USER_Password = await bcrypt.compare(password, USER.password);

    if (USER && USER_Password) {
      // return ther user data
      return Res.json({
        Status: "Success",
        Data: await Users_Model.findOne({ email }, { Token: 1, _id: 1 }),
      });
    } // here found email but the password does not match
    else {
      return Res.json({
        Status: "Faild",
        message: "Sorry Password is wrong !",
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// register user authentication and store him into database
const User_Register = async (Req, Res) => {
  const { FirstName, LastName, email, password, Role } = Req.body;
  const Errors = validationResult(Req);
  const Check_User = await Users_Model.findOne({ email });
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't Register please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }
  // Searching in the database to find if the user is exist
  if (Check_User) {
    return Res.json({
      Status: "Faild",
      message: "User Is already exist",
    });
  }

  try {
    const Hashed_Password = await bcrypt.hash(
      password,
      +process.env.HASH_PASSWORD
    );

    const USER = new Users_Model({
      FirstName,
      LastName,
      email,
      password: Hashed_Password,
      Role,
    });

    USER.Token = await JWT.Genetate_Token(USER);

    await USER.save();

    // return user data after saving it in the database
    return Res.json({
      Status: "Success",
      message: "User Created Successfully",
    });
  } catch (err) {
    // Error in Saving handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  User_Login,
  User_Register,
};
