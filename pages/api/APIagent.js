import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions'; 

export default async function handler(req, res) {
    try {
    const { input } = await req.body

    const response = await getQuestions(input);
    
    res.status(200).json({ output: response});

    } catch (error) {
        console.log(error);
    }
    

};

