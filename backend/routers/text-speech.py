from core.text_to_speech_stream import text_to_speech_stream
from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.post("/generate-audio", status_code=201)
async def generate_audio_endpoint(text: str):
    try:
        audio = text_to_speech_stream(text)
        return {"audio": audio}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT,
            detail="No Content",
        )
