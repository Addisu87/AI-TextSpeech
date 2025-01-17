from pydantic import BaseModel


class CharacterRequest(BaseModel):
    character_name: str
    sample_audio: str  # Path to the audio file or URL
