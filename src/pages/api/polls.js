import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, options } = req.body;

    try {
      const poll = await prisma.poll.create({
        data: {
          question,
          options: {
            create: options.map((option) => ({ text: option })),
          },
        },
      });
      res.status(201).json(poll);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const polls = await prisma.poll.findMany({
        include: {
          options: true,
        },
      });
      res.status(200).json(polls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
