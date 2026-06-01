from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def red_root():
    return {"message": "API está rodando"}
