import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { LoginGetResources, LoginPostResource, RegisterPostResource } from "../resources/auth/auth.resources";
import UserModel, { IUser } from "../entities/user";
import { HttpError } from "../exceptions/httperror.exception";


export function signToken(user: IUser): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    secret as Secret,
    { expiresIn: expiresIn } as SignOptions
  );
}

export async function register(input: RegisterPostResource): Promise<LoginGetResources> {
  const { name, email, password } = input;

  await UserModel.findOne({ email })
    .then(() => {
      throw new HttpError("Email already exists", 409)
    });


  const passwordHash = await bcrypt.hash(password, 12);

  return await UserModel.create({ name, email, passwordHash })
    .then((user: IUser) => { return { "token": signToken(user), 'user': user as any } })





}


export async function login(input: LoginPostResource): Promise<LoginGetResources> {
  const { email, password } = input;


  const user = await UserModel.findOne({ email });
  if (user) {
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (ok) {
      return { token: signToken(user), user: user };
    }
  }

  
  throw new HttpError("Invalid credentials", 401);


}

