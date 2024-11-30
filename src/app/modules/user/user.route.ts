import {Router} from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post('/create-student', userControllers.createUserStudent )


export const userRoutes = router;