// import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions';
const fs = require('fs');


export default async function handler(req, res) {
    // console.log('in APIagent')
    // console.log('req.body', req.body)
    try {
        const { input } = await req.body


        //console.log('input', input.substring(0, 100))
        const response = await getQuestions(input);

        res.status(200).json({ output: response });

    } catch (error) {
        console.log(error);
        // console.log('error in APIagent')
    }

};

