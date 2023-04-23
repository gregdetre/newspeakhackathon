import { LLMChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { AgentExecutor, ZeroShotAgent, initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";

import { CallbackManager } from "langchain/callbacks";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";

const KEY = process.env.OPENAI_API_KEY

export async function getQuestions(payload) {

    const model = new ChatOpenAI({
        openAIApiKey: KEY, 
        temperature: 0,
        
       })

    const template ="Your task is the come up with 5 unique question about the the given text. The questions are needed to test a student's understanding of the text. You are only allowed to answer with a JSON object"

    const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
    ]);

    const chain = new LLMChain({
        prompt: prompt,
        llm: model,
    });


    const response = await chain.call({ text: payload });

    return response.text
}

