const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { Readability } = require('@mozilla/readability');
const fs = require('fs');


export default async function handler(req, res) {
    try {
        const { input } = await req.body
        var article = await getArticleText(input);
        res.status(200).json({ output: article });

    } catch (error) {
        console.log("error in APIscraper")
        // console.log(error);
    }
};


export async function getArticleText(url) {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const reader = new Readability(dom.window.document);
    var article = reader.parse().textContent;
    article = article.trim()
    // GPT-3.5 can handle 4000 tokens, i.e. 3000 words, i.e. 18000 characters
    article = article.slice(0, 15000);
    // console.log(article);
    return article;
}


