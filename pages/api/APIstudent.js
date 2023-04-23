import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions'; 
import { getStudent } from '@/utils/students';

export default async function handler(req, res) {
    try {

    const { input } = await req.body
    const { question } = await req.body;

    const response = await getStudent(input, question);
    
    res.status(200).json({ output: response});

    } catch (error) {
        console.log(error);
    }
    

};