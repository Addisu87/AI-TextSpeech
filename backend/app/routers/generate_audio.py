import os
import uuid

from core.premiere_integration import import_audio_to_premiere
from core.text_to_speech_stream import text_to_speech_stream
from fastapi import APIRouter, BackgroundTasks, HTTPException, status
from fastapi.responses import JSONResponse
from models.character import CharacterRequest
from models.text import TextToSpeechRequest

# Define router
router = APIRouter()

# In-memory character-voice mapping
character_voice_map = {}

# Ensure the 'audio' folder exists
AUDIO_FOLDER = "audio"
os.makedirs(AUDIO_FOLDER, exist_ok=True)


@router.post("/create-voice-clone", status_code=201)
async def create_voice_clone(request: CharacterRequest):
    """
    Create or assign a voice clone for a character.
    """
    try:
        character_name = request.character_name
        sample_audio = request.sample_audio

        if not character_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Character name is required.",
            )

        # Store the character-voice mapping in memory
        character_voice_map[character_name] = sample_audio
        return {"message": f"Voice clone created for {character_name}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating voice clone: {str(e)}",
        )


@router.post("/add-voice-to-block", status_code=201)
async def add_voice_to_block(
    request: TextToSpeechRequest, background_tasks: BackgroundTasks
):
    """
    Generate voice audio and import into Premiere.
    """
    try:
        character_name = request.character_name
        text = request.text

        # Generate audio stream using text_to_speech_stream
        audio_stream = text_to_speech_stream(text)

        # Save audio file
        audio_file_name = f"{character_name.replace(' ', '_')}_{uuid.uuid4()}.mp3"
        audio_file_path = os.path.join(AUDIO_FOLDER, audio_file_name)

        # Save the audio stream to the file
        with open(audio_file_path, "wb") as audio_file:
            audio_file.write(audio_stream.read())

        #  Background task to import audio to Premiere
        background_tasks.add_task(
            import_audio_to_premiere, audio_file_path, character_name
        )
        return JSONResponse({"message": "Audio generation started."}, status_code=200)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating audio: {str(e)}",
        )
