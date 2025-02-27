import { prisma } from "src/database/prismaDatabase";

class ChatRepository {
  public async getMessages() {
    const messages = await prisma.message.findMany({
      include: {
        user: true,
      },
    });
    return messages;
  }

  public async createMessage(args: { userId: string; content: string }) {
    const newMessage = await prisma.message.create({
      data: {
        ...args,
      },
      include: {
        user: true,
      },
    });
    return newMessage;
  }
}

const chatRepository = new ChatRepository();

export default chatRepository;
