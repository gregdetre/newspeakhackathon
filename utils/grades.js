import { LLMChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { AgentExecutor, ZeroShotAgent, initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";

import { CallbackManager } from "langchain/callbacks";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";

const KEY = ""

export async function getGrader(payload, question, answer) {

    const model = new ChatOpenAI({
        openAIApiKey: KEY,
        temperature: 0,

    })

    //const template = "your task is to grade the following answer based on the question and the original source material. you're only allowed to answer with a mark between 0 and 100"
    const template = "Your task is to grade the following answer based on the question and the original source material. Your answer has to be a JSON object with a key called 'grade' and a value between 0 and 100 and a key called 'feedback' and a value of type string. Your answer can't contain anything else other than the JSON object."

    const prompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(template),
        HumanMessagePromptTemplate.fromTemplate("original source: {text}"),
        HumanMessagePromptTemplate.fromTemplate("question: {question}"),
        HumanMessagePromptTemplate.fromTemplate("answer: {answer}"),
    ]);

    const chain = new LLMChain({
        prompt: prompt,
        llm: model,
    });

    const response = await chain.call({ text: payload, question: question, answer: answer });

    return response.text
}