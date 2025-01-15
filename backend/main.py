from core.text_to_speech_stream import text_to_speech_stream
from dotenv import load_dotenv
from fastapi import FastAPI

app = FastAPI()


load_dotenv()


@app.get("/")
async def main(text: str):
    audio_stream = text_to_speech_stream(text)
    print(f"Audio-Stream: {audio_stream}")
