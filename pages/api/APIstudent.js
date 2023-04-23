import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions'; 
import { getStudent } from '@/utils/students';

export default async function handler(req, res) {
    try {
    const { input } = await req.body
    
    console.log("input" + input);

    const response = await getStudent(input);
    console.log("response" + response);
    
    res.status(200).json({ output: response});

    } catch (error) {
        console.log(error);
    }
    

};