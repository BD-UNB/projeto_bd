from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from infra.database import init_database

from routers import authRouter, adminRouter, sessionRouter, vagaRouter, comentarioRouter, candidaturaRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.on_event("startup")
async def on_startup():
   if init_database():
       print("Database inicializado com sucesso!")
   else:
       print("Erro ao inicializar database!")

app.include_router(authRouter.router)
app.include_router(adminRouter.router)
app.include_router(sessionRouter.router)
app.include_router(vagaRouter.router)
app.include_router(comentarioRouter.router)
app.include_router(candidaturaRouter.router)

@app.get("/")
def get_root():
    return {"message": "API está rodando"}
