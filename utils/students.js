import { LLMChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { AgentExecutor, ZeroShotAgent, initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";

import { CallbackManager } from "langchain/callbacks";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";

const KEY = ""

export async function getStudent(payload, question) {

    const model = new ChatOpenAI({
        openAIApiKey: KEY,
        temperature: 0,

    })

    const template = "You are a student who's learning a new subject. The user will give you an explanation about the subject. Your knowledge is limited EXCLUSIVELY to what the user has told you. You will have to answer a question, using only the knowledge you have been given"

    const prompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(template),
        HumanMessagePromptTemplate.fromTemplate("This is the explanation: {text}"),
        HumanMessagePromptTemplate.fromTemplate("Answer the following question: {question}"),
    ]);

    const chain = new LLMChain({
        prompt: prompt,
        llm: model,
    });


    const response = await chain.call({ text: payload, question: question });

    return response.text
}