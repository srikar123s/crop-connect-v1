import os
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

API_KEY = "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"

if not API_KEY:
    raise ValueError("Missing GROQ_API_KEY")

client = Groq(api_key=API_KEY)
app = FastAPI()

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALIDATION_PROMPT = "You are an intelligent assistant. Analyze the input question carefully. Respond with 'Yes' if the input is agriculture-related, and 'No' otherwise."
RESPONSE_PROMPT = "You are an agriculture expert. Provide a concise and accurate answer to the following agriculture-related question:"

class Question(BaseModel):
    text: str

def validate_input(input_text):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": VALIDATION_PROMPT},
                {"role": "user", "content": input_text},
            ],
            temperature=0,
            max_completion_tokens=1,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"

def get_agriculture_response(input_text):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": RESPONSE_PROMPT},
                {"role": "user", "content": input_text},
            ],
            temperature=0.5,
            max_completion_tokens=700,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"

@app.post("/ask")
async def ask_question(question: Question):
    is_agri = validate_input(question.text)
    if is_agri.lower() == "yes":
        answer = get_agriculture_response(question.text)
    elif is_agri.lower() == "no":
        answer = "❌ This is not an agriculture-related question."
    else:
        answer = f"⚠ Unexpected validation response: {is_agri}"

    return {"question": question.text, "answer": answer}
