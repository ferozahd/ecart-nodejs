import { Router, Request, Response } from "express";
import { register, login, customerRegistration, cutomerLogin } from "../services/authService";
import { CustomerRegisterPostResource, LoginPostResource, RegisterPostResource } from "../resources/auth/auth.resources";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();


router.post(
  "/register",
  asyncHandler(async (req: Request<{}, {}, RegisterPostResource>, res: Response) => {
    const result = await register(req.body);
    return res.status(201).json(result);
  })
);



router.post(
  "/login",
  asyncHandler(async (req: Request<{}, {}, LoginPostResource>, res: Response) => {

    const result = await login(req.body);
    return res.status(200).json(result);
  })
);


router.post(
  "/customer-register",
  asyncHandler(async (req: Request<{}, {}, CustomerRegisterPostResource>, res: Response) => {
    const result = await customerRegistration(req.body);
    return res.status(201).json()
  }))


router.post("/customer-login",
  asyncHandler(async (req: Request<{}, {}, CustomerRegisterPostResource>, res: Response) => {
    const result = await cutomerLogin(req.body);
    return res.status(200).json()
  }))

export default router;
