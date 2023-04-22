import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions'; 

export default async function handler(req, res) {
    try {
    const { input } = await req.body
    
    console.log("input" + input);

    const response = await getQuestions(input);
    console.log("response" + response);
    
    res.status(200).json({response});

    } catch (error) {
        console.log(error);
    }
    

};

