from core.text_to_speech_stream import text_to_speech_stream
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.generate_audio import router as generate_audio_router

load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.include_router(generate_audio_router)


origins = [
    "http://localhost:3000",  # Frontend origin
    "http://127.0.0.1:8000",  # Backend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main(text: str):
    audio_stream = text_to_speech_stream(text)
    print(f"Audio-Stream: {audio_stream}")
