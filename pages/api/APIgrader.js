
import { getGrader } from '@/utils/grades';

export default async function handler(req, res) {
    try {
    const { input } = await req.body
    const { question } = await req.body
    const { answer } = await req.body
    
    const response = await getGrader(input, question, answer);
    
    res.status(200).json({ output: response});

    } catch (error) {
        console.log(error);
    }
};

