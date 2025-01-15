import asyncio

from core.text_to_speech_file import text_to_speech_file
from dotenv import load_dotenv
from fastapi import FastAPI

app = FastAPI()


load_dotenv()


@app.get("/")
async def main(text: str):
    audio_file = text_to_speech_file(text)
    print(f"Audio-Stream: {audio_file}")


if __name__ == "__main__":
    asyncio.run(main("This is a test of the ElevenLabs API."))
