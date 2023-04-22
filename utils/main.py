from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import os

os.environ["OPENAI_API_KEY"] = "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"


llm = OpenAI(temperature=0.9)
prompt = PromptTemplate(
    input_variables=["text"],
    template="Your job is to create 5 unique questions based on the following text in order to test a student: {text}",
)


chain = LLMChain(llm=llm, prompt=prompt)

input = input("Enter text: ")

print(chain.run(input))

