import os
from io import BytesIO
from typing import IO

from dotenv import load_dotenv
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs

# Load environment variables
load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

if not ELEVENLABS_API_KEY:
    raise ValueError("ELEVENLABS_API_KEY environment variable not set")

client = ElevenLabs(
    api_key=ELEVENLABS_API_KEY,
)


def text_to_speech_stream(text: str) -> IO[bytes]:
    """
    Converts text to speech using ElevenLabs API and streams audio.
    Returns:
        BytesIO object containing audio data.
    """
    response = client.text_to_speech.convert(
        text=text,
        voice_id="pNInz6obpgDQGcFmaJgB",
        model_id="eleven_multilingual_v2",
        output_format="mp3_22050_32",
        voice_settings=VoiceSettings(
            stability=0.0,
            similarity_boost=1.0,
            style=0.0,
            use_speaker_boost=True,
        ),
    )

    # Create a BytesIO object to hold audio data
    audio_stream = BytesIO()

    # option 2: process the audio bytes manually
    for chunk in response:
        if chunk:
            audio_stream.write(chunk)

    # Reset the stream to the beginning
    audio_stream.seek(0)

    # Return the stream for further processing
    return audio_stream
