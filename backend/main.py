from dotenv import load_dotenv
from fastapi import FastAPI

app = FastAPI()


load_dotenv()


@app.get("/")
async def root():
    return {"message": "Hello World"}
