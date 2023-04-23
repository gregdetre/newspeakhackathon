import { NextResponse } from 'next/server';
import { getQuestions } from '@/utils/questions';
import { getArticleText } from '@/utils/scraper';
const fs = require('fs');


export default async function handler(req, res) {
    try {

        const { input } = await req.body
/*
        var article = await getArticleText(input);
        article = article.trim()
        // GPT-3.5 can handle 4000 tokens, i.e. 3000 words, i.e. 18000 characters
        article = article.slice(0, 15000);
        // console.log(article);
        */
        const response = await getQuestions(input);
        console.log(response);
        res.status(200).json({ output: response });

    } catch (error) {
        console.log(error);
    }

};

