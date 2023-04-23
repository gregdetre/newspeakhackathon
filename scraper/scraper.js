


const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { Readability } = require('@mozilla/readability')

async function getArticleText(url) {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  return article.textContent;
}

getArticleText('https://en.wikipedia.org/wiki/Testing_effect')
  .then(text => console.log(text));

