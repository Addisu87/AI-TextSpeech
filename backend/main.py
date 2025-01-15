from core.text_to_speech_stream import text_to_speech_stream
from dotenv import load_dotenv
from fastapi import FastAPI
from routers.generate_audio import router as generate_audio_router

load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.include_router(generate_audio_router)


@app.get("/")
async def main(text: str):
    audio_stream = text_to_speech_stream(text)
    print(f"Audio-Stream: {audio_stream}")
