import User from "../models/user";
import HttpError from "../utils/httpError";
import bcrypt from "bcrypt-ts";

export default class usersService {

  async signUpUser(user: User) {
    user.password = await bcrypt.hash(user.password,10);
    await User.create(user).catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw new HttpError(400, err.message);
      } else {
        throw new Error(err.message);
      }
    });
  }

}
