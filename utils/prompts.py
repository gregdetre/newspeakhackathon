questioner = """
Write 5 unique questions about the given text.

The questions are needed to test a student's understanding of the text. The questions must all be based on the text, and not from background knowledge.

You are only allowed to answer with a JSON object, containing `questions` as an array of strings.

----

{text}

----
"""

competitor = """
Summarise and explain this text in 100 words that a twelve-year old could understand. The explanation must be based on the text, and not from background knowledge:

----

{text}

----
"""