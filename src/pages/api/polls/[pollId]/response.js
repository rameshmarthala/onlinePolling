// src/pages/api/polls/[pollId]/response.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async (req, res) => {
  const { pollId } = req.query;

  if (req.method === 'POST') {
    const { optionId } = req.body;

    try {
      // Add the response to the database
      await prisma.response.create({
        data: {
          pollId: parseInt(pollId, 10),
          optionId: parseInt(optionId, 10),
        },
      });

      res.status(200).json({ message: 'Response submitted successfully' });
    } catch (error) {
      console.error('Error submitting response:', error);
      res.status(500).json({ error: 'Failed to submit response' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
