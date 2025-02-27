import express, { NextFunction, Request, Response } from "express";
import { z, ZodRawShape } from "zod";
import chatController from "./chat.controller";

export const chatRouter = express.Router();
chatRouter.use(express.json());

chatRouter.get("/", chatController.getMessages);

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().positive("Age must be a positive integer"),
});

function validateBody<T extends ZodRawShape>(schema: z.ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body) as z.infer<typeof schema>;
      next();
    } catch (err) {
      res.status(422).json({ error: err });
    }
  };
}

chatRouter.post("/users", validateBody(userSchema), (req, res) => {
  const user = req.body as z.infer<typeof userSchema>;

  res.status(201).json({ message: "User created successfully", data: user });
});
