from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import openai
# import os

# os.environ["OPENAI_API_KEY"] = open("openai.SECRET", "r").read().strip()
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


if __name__ == "__main__":
    call_gpt4("my name is")


    