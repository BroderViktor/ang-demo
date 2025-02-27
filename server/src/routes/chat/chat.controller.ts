import { Request, Response } from "express";
import chatService from "./chat.domain";

class ChatController {
  public async getMessages(req: Request, res: Response) {
    try {
      const messages = await chatService.getMessages();
      res.status(200).send(messages);
    } catch (error) {
      res
        .status(500)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

const chatController = new ChatController();

export default chatController;
