import { CreateUser } from "../dto/users.dto";
import User from "../models/user";
import HttpError from "../utils/httpError";
import bcrypt from "bcrypt-ts";
import jwt from "jsonwebtoken";

export default class usersService {
  constructor(private jwtSecret: string) {}

  async signUp(user: CreateUser) {
    user.password = await bcrypt.hash(user.password, 10);
    await User.create(user).catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw new HttpError(400, err.errors[0].message);
      } else {
        throw new Error(err.message);
      }
    });
  }

  async login(username: string, password: string) {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      throw new HttpError(401, "Password incorrect");
    }
    const profile = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture
    }
    const payload = {
      id: user.id,
      ...profile
    };

    const token = jwt.sign(
      payload,
      this.jwtSecret,
      {
        expiresIn:"7d"
      }
    );

    return {token,profile};
  }

  async getUser(id: string)  {
    const user = await User.findByPk(id);
    if(!(user instanceof User)) {
      throw new HttpError(404,"User not found");
    }
    return user;
  }

  async addProfilePicture (pictureName:string,id:string){
    await User.update({picture:pictureName},{
      where:{
        id
      }
    });

  }
}
