from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import openai
import os
import prompts


os.environ["OPENAI_API_KEY"] = open("openai.SECRET", "r").read().strip()
openai.api_key = open("openai.SECRET", "r").read().strip()


def call_gpt35(prompt: str):
    res = openai.Completion.create(
        prompt=prompt,
        max_tokens=10,
        echo=False,
        # model="gpt-4",
        model="text-davinci-003",
    )
    out = res.choices[0].text  # type: ignore
    print(out)


def call_gpt4(prompt: str):
    message=[{
        "role": "user",
        "content": prompt}]
    res = openai.ChatCompletion.create(
        model = "gpt-4",
        messages = message,
        max_tokens=20,
    )
    # print(res)
    out = res.choices[0]["message"]["content"]  # type: ignore
    print(out)


def call_langchain(text):
    llm = OpenAI(temperature=0.9)
    prompt = PromptTemplate(
        input_variables=["text"],
        template="Your job is to create 5 unique questions based on the following text in order to test a student: {text}",
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    print(chain.run(text))


if __name__ == "__main__":
    text = open("texts/Testing effect.markdown", "r").read().strip()
    text = text[:2000]
    prompt = prompts.questioner.format(text=text)
    # print(prompt)
    # call_gpt4("prompt")
    call_langchain(text)
    