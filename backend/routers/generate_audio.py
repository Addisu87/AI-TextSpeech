from core.text_to_speech_stream import text_to_speech_stream
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from models.text import TextToSpeechRequest

# Define router
router = APIRouter()


@router.post("/generate-audio", status_code=201)
async def generate_audio(request: TextToSpeechRequest):
    try:
        text = request.text
        audio_stream = text_to_speech_stream(text)
        # Stream the audio as response
        return StreamingResponse(
            content=audio_stream,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=output.mp3",
            },
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating audio: {str(e)}",
        )
