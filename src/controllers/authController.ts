import { Router, Request, Response, NextFunction } from "express";
import { register, login } from "../services/authService";
import { LoginPostResource, RegisterPostResource } from "../resources/auth/auth.resources";
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
  asyncHandler(async (req: Request<{}, {}, LoginPostResource>, res: Response, next: NextFunction) => {
    const result = await login(req.body);
    return res.status(200).json(result);
  })
);

export default router;
