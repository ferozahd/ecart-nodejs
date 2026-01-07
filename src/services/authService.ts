import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import {
  CustomerLoginPostResource,
  CustomerRegisterPostResource,
  LoginGetResources,
  LoginPostResource,
  RegisterPostResource
} from "../resources/auth/auth.resources";

import UserModel, { IUser } from "../entities/user";
import { HttpError } from "../exceptions/httperror.exception";
import { UserRole } from "../enums/user.role";
import { log } from "../utils/logger/log";



export function signToken(user: IUser): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  return jwt.sign(
    { 
      sub: user._id.toString(), 
      role: user.role,
      name:user.name,
      email:user.email
    },
    secret as Secret,
    { expiresIn: expiresIn } as SignOptions
  );
}

export async function register(input: RegisterPostResource): Promise<LoginGetResources> {
  const { name, email, password } = input;

  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    log(`finding user by email : ${email} and we are getting  ${existedUser}`)
    throw new HttpError("Email already exists", 409)
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return await UserModel.create({ name, email, passwordHash,role:UserRole.OWNER })
    .then((user: IUser) => {
      return {
        "token": signToken(user),
        'user': {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id.toHexString()
        }
      }
    })
}


export async function login(input: LoginPostResource): Promise<LoginGetResources> {
  const { email, password } = input;

  const user = await UserModel.findOne({ email, role: UserRole.OWNER });
  if (user) {
    log(`User found for login by email : ${email}`)
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (ok) {
      log("Password match , ready for login")
      return {
        token: signToken(user),
        user: {
          name: user.name,
          email: user.email,
          id: user._id.toHexString(),
          role: user.role
        }
      };
    }
    log(`Failed to match password `);
  }

  log("No user found in login by email : " + email);
  throw new HttpError("Invalid credentials", 401);
}



export async function customerRegistration(payload: CustomerRegisterPostResource): Promise<LoginGetResources> {
  const { name, email, password } = payload;

  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    log(`finding user by email : ${email} and we are getting  ${existedUser}`)
    throw new HttpError("Email already exists", 409);
  }


  const passwordHash = await bcrypt.hash(password, 12);

  return await UserModel.create({ name, email, passwordHash, role: UserRole.CUSTOMER })
    .then((user: IUser) => {
      return { "token": signToken(user), 'user': { ...user, id: user._id.toHexString() } }
    })


}


export async function cutomerLogin(payload: CustomerLoginPostResource) {
  const { email, password } = payload;


  const user = await UserModel.findOne({ email, role: UserRole.CUSTOMER });
  if (user) {
    log(`User found for login by email : ${email}`)
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (ok) {
      log("Password match , ready for login")
      return { token: signToken(user), user: { ...user, id: user._id.toHexString() } };
    }
    log(`Failed to match password `);
  }

  log("No user found in login by email : " + email);
  throw new HttpError("Invalid credentials", 401);
} 