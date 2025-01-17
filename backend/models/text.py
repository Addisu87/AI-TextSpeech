from pydantic import BaseModel


class TextToSpeechRequest(BaseModel):
    character_name: str
    text: str
    voice_id: str
