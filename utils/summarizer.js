import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const KEY = process.env.OPENAI_API_KEY

export const summarize = async (text) => {
  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  
  const model = new OpenAI({ temperature: 0, openAIApiKey: KEY });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model);
  const res = await chain.call({
    input_documents: docs,
  });
  console.log({ res });

  return res
};